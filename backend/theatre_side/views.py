from rest_framework import generics
from .models import Theater
from .serializers import TheaterSerializer

class TheaterListCreateAPIView(generics.ListCreateAPIView):
    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer
