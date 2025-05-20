"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from api import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", views.UserRegisteration.as_view()),
    path("api/user/login/", views.UserLogin.as_view()),
    path('api/check-verified/', views.CheckVerifiedView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/user/profile/", views.UserProfileView.as_view()),
    path('api/user/profile/upload/', views.ProfilePictureUploadView.as_view()),
    path('api/user/trades/', views.Trades.as_view()),
    path('api/user/transactions/', views.Transactions.as_view()),
    path('api/user/referrals/', views.Referrals.as_view()),
    path('api/user/purchase_trade_plan/<str:planName>/', views.PurchaseTradePlan.as_view()),
    path('api/user/purchase_mining_plan/<str:planName>/', views.PurchaseMiningPlan.as_view()),
    path('api/user/start_mining/', views.StartMining.as_view()),
    path('api/user/stop_mining/', views.StopMining.as_view()),
    path('api/user/start_trading/', views.StartTrade.as_view()),
    path('api/user/stop_trading/', views.StopTrade.as_view()),
    path("api/logout/", views.UserLogout.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)