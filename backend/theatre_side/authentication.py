from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from .models import Theatre


class TheatreJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token.get("user_id")
        except KeyError:
            raise InvalidToken(_("Token contained no recognizable user identification"))

        try:
            user = Theatre.objects.get(pk=user_id)
        except Theatre.DoesNotExist:
            raise InvalidToken(_("User not found"))

        return user
