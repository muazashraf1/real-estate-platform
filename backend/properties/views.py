from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from properties.serializers import PropertyCreateSerializer, PropertyListSerializer, PropertyDetailSerializer
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from django.shortcuts import get_object_or_404
from properties.serializers import PropertyCreateSerializer
from properties.models import Property

# Create your views here.


class PropertyCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # agent = get_object_or_404(User, is_agent=True)
        if not request.user.is_agent:
            return Response({"message": "Just agent can create the property!"})

        prop = request.data
        serializer = PropertyCreateSerializer(prop, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "property created successfully!"})
        return Response(serializer.error)


class PropertyGetView(APIView):
    def get(self, request):
        if request.user.is_staff:
            prop = Property.objects.all()
            serializer = PropertyListSerializer(prop)
            return Response(serializer.data)
        else:
            prop = Property.objects.filter(agent=request.user)
            serializer = PropertyListSerializer(prop)
            return Response(serializer.data)

class PropertyDetailView(APIView):
    def get(self, request, id):
        prop = Property.objects.all()
        serializer =  PropertyDetailSerializer(prop)