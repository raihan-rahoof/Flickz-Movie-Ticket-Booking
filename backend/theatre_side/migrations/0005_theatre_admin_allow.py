# Generated by Django 4.1.2 on 2024-05-14 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theatre_side', '0004_onetimepasswordtheatre'),
    ]

    operations = [
        migrations.AddField(
            model_name='theatre',
            name='admin_allow',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]