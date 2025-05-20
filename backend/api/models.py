from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator
import random, string
import secrets
import string

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)



BROKER_STATUS= [
    ('Inactive', 'Inactive'),
    ('Active', 'Active')
]

TRANSACTION_STATUS = [
    ('Pending', 'Pending'),
    ('Success', 'Success')
]

TRANSACTION_METHOD= [
    ('BTC', 'BTC'),
    ('ETH', 'ETH')
]
class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    confirmPassword= models.CharField(max_length= 50, null=True, blank=True)
    first_name = models.CharField("First Name", max_length= 50, null=True, blank=True)
    last_name = models.CharField("Last Name", max_length= 50, null=True, blank=True)
    phone_number = models.CharField("Phone Number", max_length=20, null=True, blank=True)
    profile_pic= models.ImageField(upload_to='images/', null=True, blank=True)
    country= models.CharField("Country", max_length= 50, null=True, blank=True)

    trade_status= models.CharField("Trade status", default="Inactive", choices=BROKER_STATUS, max_length=50)
    trade_plan= models.CharField('TradePlan', max_length=50, null=True, blank=True)

    mining_status= models.CharField("Mining status", default="Inactive", choices=BROKER_STATUS, max_length=50)
    mining_plan= models.CharField('MiningPlan', max_length=50, null=True, blank=True)
    mining_hashrate = models.DecimalField("Mining Hashrate", max_digits=20, decimal_places=2, validators=[MinValueValidator(0.00000001), MaxValueValidator(9999999999)], null=True, blank=True)
    mining_efficiency = models.DecimalField("Mining Efficiency", max_digits=20, decimal_places=2, validators=[MinValueValidator(0.00000001), MaxValueValidator(9999999999)], null=True, blank=True)

    deposit_balance= models.IntegerField("Deposit_Balance", default=50, validators=[MaxValueValidator(9999999999)])
    trade_balance= models.IntegerField("Trade Balance", default=0, validators=[MaxValueValidator(9999999999)])
    mining_balance= models.IntegerField("Mining Balance", default=0, validators=[MaxValueValidator(9999999999)])
    bonus_balance= models.IntegerField("Bonus Balance", default=0, validators=[MaxValueValidator(9999999999)])

    referral_code = models.CharField("Referral Code", max_length=100, null=True, blank=True, unique=True)
    referred_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='referred_users')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}" 
    
    def generate_ref_code(self):
        characters = string.digits + string.ascii_uppercase
        code_length = 6
        self.referral_code = ''.join(random.choice(characters) for _ in range(code_length))

    def save(self, *args, **kwargs):
        if not self.referral_code:
            self.generate_ref_code()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    



TRANSACTION_TYPE= [
    ('Deposit', 'Deposit'),
    ('Withdrawal', 'Withdrawal')
]
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type= models.CharField("Type", choices=TRANSACTION_TYPE, max_length=10)
    amount= models.IntegerField("Amount", validators=[MaxValueValidator(9999999999)])
    date= models.DateField("Date", auto_now_add=True)
    status= models.CharField("Status", default="Pending", choices=TRANSACTION_STATUS, max_length=10)
    method= models.CharField("Method", choices=TRANSACTION_METHOD, max_length=5)

    def __str__(self):
        return self.user.full_name




TRADE_TYPE= [
    ('Buy', 'Buy'),
    ('Sell', 'Sell')
]
TRADE_STATUS= [
    ('Open', 'Open'),
    ('Closed', 'Closed')
]
class Trade(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset= models.CharField("Asset", max_length=10, null=True, blank=True)
    quantity= models.DecimalField("Quantity", max_digits=20, decimal_places=8, validators=[MinValueValidator(0.00000001), MaxValueValidator(9999999999)])
    price= models.IntegerField("Price", validators=[MaxValueValidator(9999999999)])
    date= models.DateField("Date", auto_now_add=True)
    type= models.CharField("Type", choices=TRADE_TYPE, max_length=10, null=True, blank=True)
    status= models.CharField("Status", choices=TRADE_STATUS, default="Closed", max_length=10, null=True, blank=True)

    def __str__(self):
        return self.user.full_name




ASSETS= [
    ('bitcoin', 'bitcoin'),
    ('ethereum', 'ethereum')
]
class Asset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name= models.CharField("Asset", max_length=10, null=True, blank=True)
    quantity= models.DecimalField("Quantity", default=0, max_digits=20, decimal_places=8, validators=[MinValueValidator(0.00000001), MaxValueValidator(9999999999)])

    def __str__(self):
        return self.user.full_name

    