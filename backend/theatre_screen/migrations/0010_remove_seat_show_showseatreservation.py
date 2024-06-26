# Generated by Django 5.0.6 on 2024-06-18 08:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theatre_screen', '0009_seat_show'),
        ('theatre_side', '0016_alter_shows_theatre'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seat',
            name='show',
        ),
        migrations.CreateModel(
            name='ShowSeatReservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_reserved', models.BooleanField(default=False)),
                ('selected_at', models.DateTimeField(blank=True, null=True)),
                ('reserved_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('seat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='theatre_screen.seat')),
                ('selected_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='show_selected_seats', to=settings.AUTH_USER_MODEL)),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='theatre_side.shows')),
            ],
        ),
    ]
