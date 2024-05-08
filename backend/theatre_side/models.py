from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext_lazy as _
from .managers import TheatreManager

class Theatre(AbstractBaseUser, PermissionsMixin):
    theatre_name = models.CharField(max_length=100, unique=True,null=True,blank=True)
    owner_name = models.CharField(max_length=100,null=True,blank=True)
    email = models.EmailField(unique=True,null=True,blank=True)
    phone_number = models.CharField(max_length=15, unique=True,null=True,blank=True)
    password = models.CharField(max_length=128,null=True,blank=True)
    address = models.CharField(max_length=255,null=True,blank=True)
    city = models.CharField(max_length=100,null=True,blank=True)
    district = models.CharField(max_length=100,null=True,blank=True)
    state = models.CharField(max_length=100,null=True,blank=True)
    pincode = models.CharField(max_length=6,null=True,blank=True)
    google_maps_link = models.URLField(max_length=200,null=True,blank=True)
    is_active = models.BooleanField(default=True,null=True,blank=True)
    is_verified = models.BooleanField(default=False,null=True,blank=True)
    date_joined = models.DateTimeField(auto_now_add=True,null=True,blank=True)

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="theatre_groups", # Custom related_name for Theatre model
        related_query_name="theatre",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="theatre_user_permissions", # Custom related_name for Theatre model
        related_query_name="theatre",
    )


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "owner_name", "phone_number", "address", "city", "district", "state", "pincode", "google_maps_link"]

    objects = TheatreManager()

    class Meta:
        verbose_name = _("Theatre")
        verbose_name_plural = _("Theatres")

    def __str__(self):
        return self.theatre_name

    @property
    def get_full_name(self):
        return self.theatre_name

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }