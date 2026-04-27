from rest_framework import serializers
from properties.models import *


class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            "title",
            "description",
            "Price",
            "property_status",
            "property_type",
            "city",
            "address",
        ]


class PropertyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            "title",
            "description",
            "Price",
            "property_type",
            "slug"
        ]

class PropertyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        models = Property
        fields = '__all__'
        
