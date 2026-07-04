import os
import uuid

from django.core.files.storage import default_storage
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Location
from .serializers import LocationSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    @action(detail=False, methods=['post'], url_path='upload-photo')
    def upload_photo(self, request):
        photo = request.FILES.get('photo')

        if not photo:
            return Response(
                {'detail': 'No photo provided.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not photo.content_type.startswith('image/'):
            return Response(
                {'detail': 'File must be an image.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        extension = os.path.splitext(photo.name)[1]
        filename = f'locations/{uuid.uuid4().hex}{extension}'
        saved_path = default_storage.save(filename, photo)
        photo_url = request.build_absolute_uri(default_storage.url(saved_path))

        return Response(
            {
                'photo_path': saved_path,
                'photo_url': photo_url,
            },
            status=status.HTTP_201_CREATED,
        )
