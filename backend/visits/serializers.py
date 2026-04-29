from rest_framework import serializers
from visits.models import VisitRequest


class CreateVisitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitRequest
        fields = "__all__"

class visitListSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitRequest
        fields = ['agent']
