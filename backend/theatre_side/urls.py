from django.contrib import admin
from django.urls import path
from .views import TheaterListCreateAPIView


urlpatterns = [
     path('register/', TheaterListCreateAPIView.as_view(), name='theater-list-create'),
   
] 