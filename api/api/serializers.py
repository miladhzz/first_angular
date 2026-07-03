from rest_framework import serializers

from .models import Location


class LocationSerializer(serializers.ModelSerializer):
    availableUnits = serializers.IntegerField(source='available_units')

    class Meta:
        model = Location
        fields = [
            'id',
            'name',
            'city',
            'state',
            'photo',
            'availableUnits',
            'wifi',
            'laundry',
        ]
