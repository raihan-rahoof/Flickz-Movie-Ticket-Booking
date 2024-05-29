from django.urls import path

from .views import (
    TheatreEmailVerification,
    TheatreLoginView,
    TheatreLogoutView,
    TheatreRegisterView,
)

urlpatterns = [
    path("register/", TheatreRegisterView.as_view(), name="theatre-register"),
    path(
        "verify-email/", TheatreEmailVerification.as_view(), name="email-verification"
    ),
    path("theatre-login/", TheatreLoginView.as_view(), name="theatre-login"),
    path("theatre-logout/", TheatreLogoutView.as_view(), name="theatre-logout"),
]
