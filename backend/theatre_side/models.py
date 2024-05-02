from django.db import models

class Theater(models.Model):
    owner_name = models.CharField(max_length=255, blank=True, null=True)
    theater_name = models.CharField(max_length=255, blank=True, null=True)
    theater_email = models.EmailField(blank=True, null=True)
    theater_phone = models.CharField(max_length=15, blank=True, null=True)
    google_map_link = models.URLField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    town = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.theater_name
