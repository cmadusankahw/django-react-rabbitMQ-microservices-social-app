from rest_framework import serializers
from zone_listener.models import Day


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'
