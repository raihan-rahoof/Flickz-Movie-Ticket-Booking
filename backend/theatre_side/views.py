from rest_framework import generics
from .serializers import TheatreRegistrationSerializer
from .models import Theatre

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response

class TheatreRegisterView(generics.CreateAPIView):
    queryset = Theatre.objects.all()
    serializer_class = TheatreRegistrationSerializer


