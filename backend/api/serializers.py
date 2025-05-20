from rest_framework import serializers
from django.contrib.auth import authenticate
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from .models import User, Transaction, Trade, Asset
import logging

logger = logging.getLogger(__name__)


class RegisterationSerializer(serializers.ModelSerializer):
    ref_code = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'country', 'confirmPassword',  'ref_code']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        ref_code = validated_data.pop('ref_code', None)
        try:
            user = User.objects.create_user(**validated_data)
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise serializers.ValidationError({"error": "Failed to create user."})
        
        if ref_code:
            try:
                referrer = User.objects.get(referral_code=ref_code)
                user.referred_by = referrer
                user.bonus_balance += 50
                referrer.bonus_balance += 50
                referrer.save()
                user.save()
            except User.DoesNotExist:
                logger.warning(f"Referral code {ref_code} does not exist.")
                raise serializers.ValidationError({"referral_code": "Invalid referral code."})
            except Exception as e:
                logger.error(f"Error handling referral code: {e}")
                raise serializers.ValidationError({"error": "Failed to handle referral code."})

        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        read_only_fields = ['user']
        fields = '__all__'
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    


class AssetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Asset
        fields = '__all__'



class TransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Transaction
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return Transaction.objects.create(**validated_data)


    

class TradeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Trade
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return Trade.objects.create(**validated_data)