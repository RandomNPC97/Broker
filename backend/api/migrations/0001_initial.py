# Generated by Django 5.0.6 on 2024-11-15 20:54

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('confirmPassword', models.CharField(blank=True, max_length=50, null=True)),
                ('first_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='First Name')),
                ('last_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='Last Name')),
                ('phone_number', models.CharField(blank=True, max_length=20, null=True, verbose_name='Phone Number')),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('country', models.CharField(blank=True, max_length=50, null=True, verbose_name='Country')),
                ('trade_status', models.CharField(choices=[('Inactive', 'Inactive'), ('Active', 'Active')], default='Inactive', max_length=50, verbose_name='Trade status')),
                ('trade_plan', models.CharField(blank=True, max_length=50, null=True, verbose_name='TradePlan')),
                ('mining_status', models.CharField(choices=[('Inactive', 'Inactive'), ('Active', 'Active')], default='Inactive', max_length=50, verbose_name='Mining status')),
                ('mining_plan', models.CharField(blank=True, max_length=50, null=True, verbose_name='MiningPlan')),
                ('mining_hashrate', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True, validators=[django.core.validators.MinValueValidator(1e-08), django.core.validators.MaxValueValidator(9999999999)], verbose_name='Mining Hashrate')),
                ('mining_efficiency', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True, validators=[django.core.validators.MinValueValidator(1e-08), django.core.validators.MaxValueValidator(9999999999)], verbose_name='Mining Efficiency')),
                ('deposit_balance', models.IntegerField(default=10, validators=[django.core.validators.MaxValueValidator(9999999999)], verbose_name='Deposit_Balance')),
                ('trade_balance', models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(9999999999)], verbose_name='Trade Balance')),
                ('mining_balance', models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(9999999999)], verbose_name='Mining Balance')),
                ('bonus_balance', models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(9999999999)], verbose_name='Bonus Balance')),
                ('referral_code', models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='Referral Code')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('referred_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='referred_users', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=10, null=True, verbose_name='Asset')),
                ('quantity', models.DecimalField(decimal_places=8, default=0, max_digits=20, validators=[django.core.validators.MinValueValidator(1e-08), django.core.validators.MaxValueValidator(9999999999)], verbose_name='Quantity')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Trade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asset', models.CharField(blank=True, max_length=10, null=True, verbose_name='Asset')),
                ('quantity', models.DecimalField(decimal_places=8, max_digits=20, validators=[django.core.validators.MinValueValidator(1e-08), django.core.validators.MaxValueValidator(9999999999)], verbose_name='Quantity')),
                ('price', models.IntegerField(validators=[django.core.validators.MaxValueValidator(9999999999)], verbose_name='Price')),
                ('date', models.DateField(auto_now_add=True, verbose_name='Date')),
                ('type', models.CharField(blank=True, choices=[('Buy', 'Buy'), ('Sell', 'Sell')], max_length=10, null=True, verbose_name='Type')),
                ('status', models.CharField(blank=True, choices=[('Open', 'Open'), ('Closed', 'Closed')], default='Closed', max_length=10, null=True, verbose_name='Status')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('Deposit', 'Deposit'), ('Withdrawal', 'Withdrawal')], max_length=10, verbose_name='Type')),
                ('amount', models.IntegerField(validators=[django.core.validators.MaxValueValidator(9999999999)], verbose_name='Amount')),
                ('date', models.DateField(auto_now_add=True, verbose_name='Date')),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Success', 'Success')], default='Pending', max_length=10, verbose_name='Status')),
                ('method', models.CharField(choices=[('BTC', 'BTC'), ('ETH', 'ETH')], max_length=5, verbose_name='Method')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
