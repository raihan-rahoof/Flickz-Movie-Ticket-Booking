from rest_framework import serializers
from .models import Theater

class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')  # Remove password from validated data
        theater = Theater.objects.create(**validated_data)
        theater.set_password(password)  # Hash and set password
        theater.save()
        return theater