from django.contrib import admin
from django.urls import path
from .views import UserRegisterView,VerifyUserEmail,LoginUserView,TestingAuthenticatedReq,PasswordResetRequest,PasswordResetConfirm,SetNewPasswordView,LogoutApiView
from rest_framework_simplejwt.views import (TokenRefreshView,)

urlpatterns = [
    path('register/',UserRegisterView.as_view(),name='register'),
    path('verify-email/',VerifyUserEmail.as_view(),name='verify'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('testauth/',TestingAuthenticatedReq.as_view(),name='testauth'),
    path('password-reset/',PasswordResetRequest.as_view(),name="password-reset"),
    path('reset-password-confirm/<uidb64>/<token>/',PasswordResetConfirm.as_view(),name="reset-password-confirm"),
    path('set-new-password/',SetNewPasswordView.as_view(),name="set-new-password"),
    path('logout/',LogoutApiView.as_view(),name="logout")
] 