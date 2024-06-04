from adminside.models import Movie
from rest_framework import serializers
from user_auth.models import User
from rest_framework.exceptions import AuthenticationFailed,ValidationError
from .models import Shows, Theatre
from django.contrib.auth import authenticate

class TheatreRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Theatre
        fields = [
            "email",
            "password",
            "theatre_name",
            "owner_name",
            "license",
            "phone_number",
            "address",
            "city",
            "district",
            "state",
            "pincode",
            "google_maps_link",
        ]

    def create(self, validated_data):
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        user = User.objects.create_theatre_user(email=email, password=password)
        theatre_profile = Theatre.objects.create(user=user, **validated_data)
        return theatre_profile


class TheatreLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')

        try:
            user = User.objects.get(email=email)
            theatre = Theatre.objects.get(user=user)
        except User.DoesNotExist:
            raise AuthenticationFailed('Invalid Credentials , Please try again')

        if user.user_type != 'theatre':
            raise AuthenticationFailed('Invalid credentials')

        if not user.is_active and not theatre.is_active:
            raise AuthenticationFailed('Your account is Blocked by the Adminstration for some reason')

       
        
        if not user.is_verified and not theatre.is_verified:
            raise AuthenticationFailed(
                "Your account is Out of verification"
            )
        
        theatre_profile = authenticate(request,email=email,password=password,user_type='theatre')
        if not theatre_profile:
            raise AuthenticationFailed(
                "Invalid Credentials"
            )
        if not theatre.admin_allow:
            raise AuthenticationFailed(
                "Your account is currently pending review by our administration team. We will update you on Mail with the status of your account approval within one business day. Thank you for your patience."
            )
        
        return {
            'email': user.email,
            'full_name': user.get_full_name,
            'access_token': user.tokens().get('access'),
            'refresh_token': user.tokens().get('refresh'),
        }
# ------------- Show Serialiser ---------------------------


class ShowMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class ShowCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shows
        fields = "__all__"


class ShowListSerializer(serializers.ModelSerializer):
    movie = ShowMovieSerializer()

    class Meta:
        model = Shows
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Customize representation if needed
        return data
