from django.urls import path
from .views import TheatreRegisterView , TheatreEmailVerification,TheatreLoginView

urlpatterns = [
    path('register/', TheatreRegisterView.as_view(), name='theatre-register'),
    path('verify-email/', TheatreEmailVerification.as_view(), name='email-verification'),
    path('theatre-login/', TheatreLoginView.as_view(), name='theatre-login')
]