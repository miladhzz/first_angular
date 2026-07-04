import os
import uuid

from django.core.files.storage import default_storage
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Location
from .serializers import (
    LocationSerializer,
    PhotoUploadSerializer,
)


class PhotoUploadView(APIView):
    def post(self, request):
        serializer = PhotoUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        photo = serializer.validated_data['photo']

        extension = os.path.splitext(photo.name)[1].lower()
        filename = f'locations/{uuid.uuid4().hex}{extension}'

        saved_path = default_storage.save(filename, photo)

        return Response(
            {
                'photo_path': saved_path,
                'photo_url': request.build_absolute_uri(
                    default_storage.url(saved_path)
                ),
            },
            status=status.HTTP_201_CREATED,
        )


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer