from django.db import models


# Create your models here.
class Screen(models.Model):
    name = models.CharField(max_length=100,blank=True,null=True)
    quality = models.CharField(max_length=100,blank=True,null=True)
    sound = models.CharField(max_length=100,blank=True,null=True)
    rows = models.IntegerField(default=10)
    cols = models.IntegerField(default=10)
    image = models.ImageField(upload_to="screens/", null=True, blank=True)
    layout = models.JSONField(default=list, blank=True)
    
    def __str__(self):
        return self.name


class Section(models.Model):
    name = models.CharField(max_length=100,blank=True,null=True)
    rows = models.IntegerField(null=True,blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    screen = models.ForeignKey(
        Screen, related_name="sections", on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name} - {self.screen.name}"


class Seat(models.Model):
    section = models.ForeignKey(Section, related_name="seats", on_delete=models.CASCADE)
    row_number = models.IntegerField()
    column_number = models.IntegerField()
    is_reserved = models.BooleanField(default=False)

    def __str__(self):
        return f"Seat {self.row_number}-{self.column_number} in {self.section.name}"
