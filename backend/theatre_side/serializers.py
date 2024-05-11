from rest_framework import serializers
from .models import Theatre
from django.contrib.auth import authenticate
class TheatreRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theatre
        fields = ('theatre_name', 'owner_name', 'email', 'phone_number', 'password', 'address', 'city', 'district', 'state', 'pincode', 'google_maps_link')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password_confirm = validated_data.pop('password_confirm', None)
        if password and password_confirm and password != password_confirm:
            raise serializers.ValidationError({"password_confirm": "Passwords must match."})
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

