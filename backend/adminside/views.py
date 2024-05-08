from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import AdminLoginSerializer , UserListSerializer,MovieSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from user_auth.models import User
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from .models import Movie
# Create your views here.

#user side [authentication , block and unblock , also Listing users]

class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        return Response(data, status=status.HTTP_200_OK)


class UserListView(generics.ListAPIView):
        queryset = User.objects.filter(is_superuser=False)
        serializer_class = UserListSerializer
        permission_classes = [IsAdminUser]


class BlockUnblockUser(APIView):
     def put(self,request,id):
        try:
            user = User.objects.get(pk=id)
        except User.DoesNotExist:
             return Response({'error':'user not found'},status=status.HTTP_404_NOT_FOUND)
        
        user.is_active = not user.is_active
        user.save()
        serializer = UserListSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)
          

#movies section [movie adding , updating , deleting]

     
class MovieListCreateAPIView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)

        title = serializer.validated_data.get('title')
        language = serializer.validated_data.get('language')
        genre = serializer.validated_data.get('genre')

        existing_movie = Movie.objects.filter(title=title , language = language , genre=genre)

        if existing_movie:
             return Response({'error':'Movie with same Name,Language,Genre already exists'})
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)