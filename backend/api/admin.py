from django.contrib import admin
from .models import User, Transaction, Trade, Asset

# Register your models here.
admin.site.register(User)
admin.site.register(Trade)
admin.site.register(Transaction)
admin.site.register(Asset)
