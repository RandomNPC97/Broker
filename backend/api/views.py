from rest_framework import viewsets, status
from rest_framework.decorators import action
from decimal import Decimal
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Sum
from . import serializers
from .models import User, Transaction, Trade, Asset
from rest_framework.decorators import api_view
from urllib.parse import unquote

# Create your views here.




class UserRegisteration(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = serializers.RegisterationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data 
        data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_201_CREATED)




class UserLogin(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = serializers.LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)
    



class CheckVerifiedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({'is_verified': user.is_verified})




class ProfilePictureUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = serializers.UserSerializer(user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class UserProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user
    


class UserAssetViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]    
    queryset = Asset.objects.all()
    serializer_class = serializers.AssetSerializer


    def get_queryset(self):
        return Asset.objects.filter(user=self.request.user)



    

class Trades(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Trade.objects.all()
    serializer_class = serializers.TradeSerializer

    def post(self, request, *args, **kwargs):   
        serializer = serializers.TradeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            type= request.data.get('type')
            amount = int(request.data.get('price'))
            quantity= Decimal(request.data.get('quantity'))
            asset= request.data.get('asset')
            user= request.user
            if type=='Buy':
                if amount > user.deposit_balance:
                    return Response(status=202)  
                else:
                    user.deposit_balance -= amount
                    user.save()
                    user_asset, created = Asset.objects.get_or_create(user=user, name=asset)
                    user_asset.quantity += quantity
                    user_asset.save()
                    trade = Trade(user=user, asset=asset, type=type, quantity=quantity, price=amount)
                    trade.save()
                    return Response(status=status.HTTP_201_CREATED)             
            else:
                try:
                    user_asset = Asset.objects.get(user=user, name=asset)
                    if user_asset.quantity < quantity:
                        return Response({'error': 'Insufficient assets'}, status=203)
                    user_asset.quantity -= quantity
                    user_asset.save()
                    trade = Trade(user=user, asset=asset, type=type, quantity=quantity, price=amount)
                    trade.save()
                except Asset.DoesNotExist:
                    return Response({'error': 'User does not own this asset'}, status=204)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



    def get(self, request, *args, **kwargs):       
        trades = Trade.objects.filter(user=request.user).order_by('-date')
        trades= serializers.TradeSerializer(trades, many=True).data

        assets = Asset.objects.filter(user=request.user)
        assets = serializers.AssetSerializer(assets, many=True).data

        response_data = {
            'trades': trades,
            'assets': assets,
        }
        return Response(response_data)
    





class Transactions(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):   
        user = request.user
        transaction_type = request.data.get('type')  # Properly initialize the type

        if transaction_type == "Deposit":
            data = request.data.copy()  
            data.pop('wallet', None)   
            serializer = serializers.TransactionSerializer(data=data, context={'request': request})    
            if serializer.is_valid():        
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif transaction_type == "Withdrawal":
            amount = int(request.data.get('amount'))
            wallet = request.data.get('wallet')

            if wallet == 'trade_balance':
                if amount > user.trade_balance:
                    return Response({'detail': 'Insufficient trading balance.'}, status=203)
                else:
                    user.trade_balance -= amount
                    user.save()
            elif wallet == 'mining_balance':
                if amount > user.mining_balance:
                    return Response({'detail': 'Insufficient mining balance.'}, status=203)
                else:
                    user.mining_balance -= amount
                    user.save()
            else: 
                if amount > user.bonus_balance:
                    return Response({'detail': 'Insufficient bonus balance.'}, status=203)
                else:
                    user.bonus_balance -= amount
                    user.save()

            data = request.data.copy()
            data.pop('wallet', None)   
            serializer = serializers.TransactionSerializer(data=data, context={'request': request})    
            if serializer.is_valid():        
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Invalid transaction type.'}, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, *args, **kwargs):       
        transactions = Transaction.objects.filter(user=request.user).order_by('-date')
        transactions= serializers.TransactionSerializer(transactions, many=True).data

        response_data = {
            'transaction_history': transactions,
        }
        return Response(response_data)





class PurchaseTradePlan(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, planName, *args, **kwargs): 
        plan_name = unquote(planName)
        user = request.user 
        if user.trade_plan == plan_name:
            return Response({"message": "You are already on this Plan"}, status=203)
        else:
            if plan_name == "Basic Plan":
                if user.deposit_balance >= 200:
                    user.deposit_balance -= 200
                    user.trade_plan = plan_name
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
            if plan_name == "Standard Plan":
                if user.deposit_balance >= 500:
                    user.deposit_balance -= 500
                    user.trade_plan = plan_name
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
            if plan_name == "Premium Plan":
                if user.deposit_balance >= 1000:
                    user.deposit_balance -= 1000
                    user.trade_plan = plan_name
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
    





class PurchaseMiningPlan(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, planName,  *args, **kwargs):
        plan_name = unquote(planName)
        user = request.user 
        if user.mining_plan == plan_name:
            return Response({"message": "You are already on this Plan"}, status=203)
        else:
            if plan_name == "Bronze Plan":
                if user.deposit_balance >= 500:
                    user.deposit_balance -= 500
                    user.mining_plan = plan_name
                    user.mining_hashrate = 5.00
                    user.mining_efficiency = 0.50
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
            if plan_name == "Silver Plan":
                if user.deposit_balance >= 2000:
                    user.deposit_balance -= 2000
                    user.mining_plan = plan_name
                    user.mining_hashrate = 15.00
                    user.mining_efficiency = 0.75
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
            if plan_name == "Gold Plan":
                if user.deposit_balance >= 5000:
                    user.deposit_balance -= 5000
                    user.mining_plan = plan_name
                    user.mining_hashrate = 30.00
                    user.mining_efficiency = 0.80
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
            if plan_name == "Diamond Plan":
                if user.deposit_balance >= 10000:
                    user.deposit_balance -= 10000
                    user.mining_plan = plan_name
                    user.mining_hashrate = 50.00
                    user.mining_efficiency = 0.85
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
            if plan_name == "Platinum Plan":
                if user.deposit_balance >= 20000:
                    user.deposit_balance -= 20000
                    user.mining_plan = plan_name
                    user.mining_hashrate = 75.00
                    user.mining_efficiency = 0.90
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
            if plan_name == "VIP":
                if user.deposit_balance >= 50000:
                    user.deposit_balance -= 50000
                    user.mining_plan = plan_name
                    user.mining_hashrate = 90.00
                    user.mining_efficiency = 0.95
                    user.save()
                    return Response({"message": f"Mining {plan_name} plan  purchased successfully"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"message": "Insufficient Balance"}, status=204)
        





class Referrals(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):   
        serialized_data = serializers.UserSerializer(User.objects.filter(referred_by=request.user), many=True).data
        referred_users = [{'id': user['id'], 'full_name': user['full_name'], 'trade_plan': user['trade_plan']} for user in serialized_data]
        response_data = {
            'referred_users': referred_users,
            'referral_code': request.user.referral_code
        }
        return Response(response_data)
    



class StartMining(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user= request.user
        if user.mining_plan is not None:
            user.mining_status = 'Active'
            user.save()
            return Response({'message': 'Mining started successfully'}, status=status.HTTP_200_OK)  
        else:
            return Response({'message': 'You are not subscribed to a mining plan yet'}, status=203)




class StopMining(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        request.user.mining_status = 'Inactive'
        request.user.save()
        return Response({'message': 'Mining stopped successfully'}, status=200)
    


class StartTrade(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user= request.user
        if user.trade_plan is not None:
            user.trade_status = 'Active'
            user.save()
            return Response({'message': 'Trade started successfully'}, status=status.HTTP_200_OK)  
        else:
            return Response({'message': 'You are not subscribed to a trade plan yet'}, status=203)




class StopTrade(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        request.user.trade_status = 'Inactive'
        request.user.save()
        return Response({'message': 'Trade stopped successfully'}, status=200)


    
    

class UserLogout(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)