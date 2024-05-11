from django.urls import path
from .views import TheatreRegisterView 

urlpatterns = [
    path('register/', TheatreRegisterView.as_view(), name='theatre-register'),
    # path('login/', TheatreLoginView.as_view(), name='theatre_login'),
]