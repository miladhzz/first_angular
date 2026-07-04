import os

from django.core.files.storage import default_storage
from rest_framework import serializers

from .models import Location


class PhotoUploadSerializer(serializers.Serializer):
    photo = serializers.ImageField()

    def validate_photo(self, value):
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError(
                'Image size must not exceed 5 MB.'
            )

        allowed_extensions = {'.jpg', '.jpeg', '.png', '.webp'}

        extension = os.path.splitext(value.name)[1].lower()

        if extension not in allowed_extensions:
            raise serializers.ValidationError(
                'Only JPG, JPEG, PNG and WEBP images are allowed.'
            )

        return value


class LocationSerializer(serializers.ModelSerializer):
    photo_path = serializers.CharField(
        write_only=True,
        required=False,
    )

    class Meta:
        model = Location
        fields = [
            'id',
            'name',
            'city',
            'state',
            'photo',
            'photo_path',
            'available_units',
            'wifi',
            'laundry',
        ]
        read_only_fields = ['photo']

    def validate(self, attrs):
        photo_path = attrs.get('photo_path')

        if self.instance is None:
            if not photo_path:
                raise serializers.ValidationError(
                    {
                        'photo_path': 'This field is required.'
                    }
                )

        if photo_path and not default_storage.exists(photo_path):
            raise serializers.ValidationError(
                {
                    'photo_path': 'Uploaded image does not exist.'
                }
            )

        return attrs

    def create(self, validated_data):
        photo_path = validated_data.pop('photo_path')

        validated_data['photo'] = photo_path

        return super().create(validated_data)

    def update(self, instance, validated_data):
        photo_path = validated_data.pop('photo_path', None)

        if photo_path:
            validated_data['photo'] = photo_path

        return super().update(instance, validated_data)