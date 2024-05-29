from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Theatre,Shows


class TheatreRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theatre
        fields = (
            "theatre_name",
            "owner_name",
            "email",
            "phone_number",
            "password",
            "address",
            "city",
            "district",
            "state",
            "pincode",
            "google_maps_link",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        password_confirm = validated_data.pop("password_confirm", None)
        if password and password_confirm and password != password_confirm:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords must match."}
            )
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class TheatreLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    access_token = serializers.CharField(read_only=True)
    refresh_token = serializers.CharField(read_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            theatre = Theatre.objects.get(email=email)
        except Theatre.DoesNotExist:
            raise AuthenticationFailed("Invalid login credentials")

        if not theatre.check_password(password):
            raise AuthenticationFailed("Invalid login credentials")

        if not theatre.admin_allow:
            raise AuthenticationFailed(
                "Please allow up to 24 hours for your request to be reviewed by our administration team. Upon approval, you will receive a notification via email."
            )

        if not theatre.is_active:
            raise AuthenticationFailed(
                "Your Account has been blocked.Connect us for more details"
            )

        tokens = theatre.tokens()

        return {
            "email": theatre.email,
            "theatre_name": theatre.theatre_name,
            "access_token": str(tokens.get("access")),
            "refresh_token": str(tokens.get("refresh")),
        }


class TheatreLogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        self.refresh_token = attrs.get("refresh_token")
        return attrs


#------------- Show Serialiser ---------------------------
    

class TheatreShowSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Shows
        fields = '__all__'

    def create(self, validated_data):
        return Shows.objects.create(**validated_data)