from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .utils import send_generated_otp_to_email

from .models import OneTimePasswordTheatre, Theatre,Shows
from .serializers import (

    TheatreLoginSerializer,
    TheatreRegistrationSerializer,
    ShowMovieSerializer,
    ShowCreateSerializer,
    ShowListSerializer,
)
from adminside.models import Movie


class TheatreRegisterView(generics.GenericAPIView):
    serializer_class = TheatreRegistrationSerializer

    def post(self,request):
        theatre_data = request.data
        serializer = self.serializer_class(data=theatre_data)
        if serializer.is_valid(raise_exception=True):
            theatre = serializer.save()
            user_email = theatre.user.email
            send_generated_otp_to_email(user_email)  
            return Response(
                {
                    "data": serializer.data,
                    "message": "A passcode has been sent to your mail to verify Email",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TheatreEmailVerification(generics.GenericAPIView):

    def post(self, request):
        try:
            passcode = request.data.get("otp")
            theatre_pass = OneTimePasswordTheatre.objects.get(code=passcode)
            theatre = theatre_pass.theatre
            user = theatre.user

            

            if not theatre.is_verified and not user.is_verified :
                theatre.is_verified = True
                user.is_verified = True
                user.save()
                theatre.save()

                return Response(
                    {"message": "Account verified successfully"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"message": "Invalid Otp,Try again"}, status=status.HTTP_204_NO_CONTENT
            )
        except OneTimePasswordTheatre.DoesNotExist:
            return Response(
                {"message": "Wrong Otp"}, status=status.HTTP_400_BAD_REQUEST
            )

class TheatreLoginView(generics.GenericAPIView):
    serializer_class = TheatreLoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

# ---------------- Shows -----------------


class TheatreShowAddView(generics.CreateAPIView):
    queryset = Shows.objects.all()
    serializer_class = ShowCreateSerializer
    permission_classes = [IsAuthenticated]

class TheatreShowListView(generics.ListAPIView):
    queryset = Shows.objects.all()
    serializer_class = ShowListSerializer


class TheatreMovieSelectView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = ShowMovieSerializer
