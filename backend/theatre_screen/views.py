from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response import Response
from .models import Screen, Seat, Section
from .serializers import ScreenSerializer,ScreenLayoutSerializer
from rest_framework.parsers import MultiPartParser, FormParser
import json
# Create your views here.
class ScreenListCreateView(generics.ListCreateAPIView):
    queryset = Screen.objects.all()
    serializer_class = ScreenSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        print(request.data)
        data = request.data
        name = data.get("name")
        quality = data.get("quality")
        sound = data.get("sound")
        rows = int(data.get("rows", 10))
        cols = int(data.get("cols", 10))
        image = data.get("image")

        screen = Screen.objects.create(
            name=name,
            quality=quality,
            sound=sound,
            rows=rows,
            cols=cols,
            image=image,
        )

        sections_data = json.loads(data.get("sections", "[]"))
        layout = []

        for section_data in sections_data:
            section_name = section_data.get("name")
            section_rows = int(section_data.get("rows"))
            section_price = section_data.get("price")

            section = Section.objects.create(
                name=section_name, rows=section_rows, price=section_price, screen=screen
            )

            for row in range(section_rows):
                layout_row = []
                for col in range(cols):
                    seat = Seat.objects.create(
                        section=section,
                        row_number=row,
                        column_number=col,
                    )
                    layout_row.append(seat.id)
                layout.append(layout_row)

        screen.layout = layout
        screen.save()

        serializer = self.get_serializer(screen)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ScreenRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Screen.objects.all()
    serializer_class = ScreenSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data.copy()
        print("Received data:", data)
        # Parse sections if they are sent as a string
        sections_data = data.get("sections")
        if isinstance(sections_data, str):
            try:
                sections_data = json.loads(sections_data)
                data["sections"] = sections_data
            except json.JSONDecodeError:
                return Response(
                    {
                        "sections": {
                            "non_field_errors": ["Invalid sections data format."]
                        }
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class ScreenLayoutUpdateView(generics.UpdateAPIView):
    queryset = Screen.objects.all()
    serializer_class = ScreenLayoutSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()

        layout = data.get('layout')

        if isinstance(layout,str):
            try:
                layout = json.loads(layout)
                data['layout']= layout
            except json.JSONDecodeError:
                return Response(
                    {"layout": {"non_field_errors": ["Invalid layout data format."]}},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
