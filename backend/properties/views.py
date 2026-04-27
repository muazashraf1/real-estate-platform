from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from properties.serializers import PropertyCreateSerializer, PropertyListSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class PropertyCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        

