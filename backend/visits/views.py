from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from visits.serializers import CreateVisitRequestSerializer, visitListSerializer
from rest_framework.permissions import IsAuthenticated
from visits.models import VisitRequest

# Create your views here.

class CreateVisitRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        property = VisitRequest.objects.filter(property=property)
        serializer = CreateVisitRequestSerializer(property)

        if property.agent != request.user:
            return Response(serializer.errors)
        
        serializer.save()


