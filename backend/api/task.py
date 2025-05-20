from .models import User

def increase_profit_balance():
    instances = User.objects.exclude(trade_status= "Inactive")
    
    for instance in instances:
        if instance.trade_plan == "Basic Plan":
            instance.trade_balance += 100
            instance.save()
            
        elif instance.trade_plan == "Standard Plan":
            instance.trade_balance += 200
            instance.save()

        elif instance.trade_plan == "Premium Plan":
            instance.trade_balance += 300
            instance.save()

        else:
            pass



def increase_mining_balance():
    instances = User.objects.exclude(mining_status= "Inactive")
    
    for instance in instances:
        if instance.mining_plan== "Bronze Plan":
            instance.mining_balance += 50
            instance.save()
            
        elif instance.mining_plan == "Silver Plan":
            instance.mining_balance += 100
            instance.save()
            
        elif instance.mining_plan == "Gold Plan":
            instance.mining_balance += 200
            instance.save()

        else:
            pass


def stop_trading_tasks():
    instances = User.objects.exclude(mining_status= "Inactive")
    
    for instance in instances:
        instance.trade_status = "Inactive"
        instance.save()

def stop_mining_tasks():
    instances = User.objects.exclude(mining_status= "Inactive")

    for instance in instances:
        instance.mining_status = "Inactive"
        instance.save()