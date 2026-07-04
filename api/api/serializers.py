from rest_framework import serializers

from .models import Location


class LocationSerializer(serializers.ModelSerializer):
    photo_path = serializers.CharField(write_only=True, required=False)

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
        extra_kwargs = {
            'photo': {'required': False},
        }

    def validate(self, attrs):
        photo = attrs.get('photo')
        photo_path = attrs.get('photo_path')

        if self.instance is None and not photo and not photo_path:
            raise serializers.ValidationError(
                {'photo': 'Either photo or photo_path is required.'}
            )

        if photo and photo_path:
            raise serializers.ValidationError(
                'Provide either photo or photo_path, not both.'
            )

        return attrs

    def create(self, validated_data):
        photo_path = validated_data.pop('photo_path', None)
        if photo_path:
            validated_data['photo'] = photo_path
        return super().create(validated_data)
