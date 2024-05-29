from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from theatre_side.utils import send_generated_otp_to_email

from .authentication import TheatreJWTAuthentication
from .models import OneTimePasswordTheatre, Theatre,Shows
from .serializers import (
    TheatreLoginSerializer,
    TheatreLogoutSerializer,
    TheatreRegistrationSerializer,
    TheatreShowSerialiser,
)


class TheatreRegisterView(generics.GenericAPIView):
    serializer_class = TheatreRegistrationSerializer

    def post(self, request):
        theatre_data = request.data
        serializer = self.serializer_class(data=theatre_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            theatre = serializer.data
            send_generated_otp_to_email(theatre["email"])
            return Response(
                {
                    "data": theatre,
                    "message": "A passcode has been sented to your mail to verify Email",
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

            print(theatre.is_verified)

            if not theatre.is_verified:
                theatre.is_verified = True
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

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class TheatreLogoutView(generics.GenericAPIView):
    serializer_class = TheatreLogoutSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TheatreJWTAuthentication]

    def post(self, request, *args, **kwargs):
        serialzer = self.get_serializer(data=request.data)
        serialzer.is_valid(raise_exception=True)

        try:
            refresh_token = RefreshToken(serialzer.validated_data["refresh_token"])
            refresh_token.blacklist()
        except TokenError:
            return Response(
                {"message": "Invalid or Expired Token"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"message": "Successfully logged out."}, status=status.HTTP_200_OK
        )


#---------------- Shows -----------------

