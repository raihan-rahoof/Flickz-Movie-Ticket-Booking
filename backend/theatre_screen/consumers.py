import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Seat
from django.utils import timezone
from asgiref.sync import sync_to_async
from user_auth.models import User

class SeatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "seats"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        seat_id = data["seat_id"]
        user_mail = data["user_mail"]
        action = data['action']

        user = await self.get_user_by_email(user_mail)
        user_id = user.id

        seat = await self.get_seat(seat_id)
        if seat:
            if action == 'select':
                seat.selected_by_id = user_id
                seat.selected_at = timezone.now()
            elif action == 'unselect':
                seat.selected_by_id = None
                seat.selected_at = None
            await self.save_seat(seat)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": f"seat_{action}",  
                "seat_id": seat_id,
                "user_id": user_id,
            },
        )

    async def seat_select(self, event):
        seat_id = event["seat_id"]
        user_id = event["user_id"]
        await self.send(
            text_data=json.dumps(
                {"type": "seat_selected", "seat_id": seat_id, "user_id": user_id}
            )
        )

    async def seat_unselect(self, event):
        seat_id = event["seat_id"]
        user_id = event["user_id"]
        await self.send(
            text_data=json.dumps(
                {"type": "seat_unselected", "seat_id": seat_id, "user_id": user_id}
            )
        )

    @sync_to_async
    def get_seat(self, seat_id):
        try:
            return Seat.objects.get(id=seat_id)
        except Seat.DoesNotExist:
            return None

    @sync_to_async
    def save_seat(self, seat):
        seat.save()

    @sync_to_async
    def get_user_by_email(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return None
