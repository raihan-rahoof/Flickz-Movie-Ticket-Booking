from django.contrib.auth.models import  BaseUserManager
from django.utils.translation import gettext_lazy as _


class TheatreManager(BaseUserManager):
    def create_theatre(self, name, owner_name, email, phone_number, password, address, city, district, state, pincode, google_maps_link, **extra_fields):
        if not name:
            raise ValueError(_("Theatre name is required"))
        if not owner_name:
            raise ValueError(_("Owner name is required"))
        if not email:
            raise ValueError(_("Email is required"))
        if not phone_number:
            raise ValueError(_("Phone number is required"))
        if not address:
            raise ValueError(_("Address is required"))
        if not city:
            raise ValueError(_("City is required"))
        if not district:
            raise ValueError(_("District is required"))
        if not state:
            raise ValueError(_("State is required"))
        if not pincode:
            raise ValueError(_("Pincode is required"))
        if not google_maps_link:
            raise ValueError(_("Google Maps link is required"))

        theatre = self.model(
            name=name,
            owner_name=owner_name,
            email=self.normalize_email(email),
            phone_number=phone_number,
            password=password,
            address=address,
            city=city,
            district=district,
            state=state,
            pincode=pincode,
            google_maps_link=google_maps_link,
            **extra_fields
        )

        theatre.set_password(password)
        theatre.save()

        return theatre
