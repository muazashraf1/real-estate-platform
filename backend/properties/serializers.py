from rest_framework import serializers
from properties.models import *


class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["title", "description", "price", "status", "type", "city", "address"]


class PropertyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "title", "price", "city", "slug"]



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["image", "is_primary"]


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ["key", "value"]

class PropertyDetailSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    features = FeatureSerializer(many=True, read_only=True)
    class Meta:
        model = Property
        fields = "__all__"