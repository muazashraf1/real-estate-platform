from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from properties.serializers import (
    PropertyCreateSerializer,
    PropertyListSerializer,
    PropertyDetailSerializer,
)
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from django.shortcuts import get_object_or_404
from properties.serializers import PropertyCreateSerializer
from properties.models import Property

# Create your views here.


class CreatePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # agent = get_object_or_404(User, is_agent=True)
        if not request.user.is_agent:
            return Response(
                {"message": "Just agent can create the property!"}, status=403
            )

        # prop = request.data
        # serializer = PropertyCreateSerializer(prop)
        serializer = PropertyCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(agent=request.user)
            return Response({"message": "property created successfully!"})
        return Response(serializer.errors, status=403)


class MyPropertyListView(APIView):
    def get(self, request):
        if request.user.is_staff:
            prop = Property.objects.all()
            # serializer = PropertyListSerializer(prop)
            return Response(serializer.data)
        else:
            prop = Property.objects.filter(agent=request.user)
            serializer = PropertyListSerializer(prop, many=True)
            return Response(serializer.data)


class PropertyDetailView(APIView):
    def get(self, request, slug):
        prop = Property.objects.get(slug=slug)
        serializer = PropertyDetailSerializer(prop)
        return Response(serializer.data)


class UpdatePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, slug):
        prop = get_object_or_404(Property, slug=slug)

        if prop.agent != request.user:
            return Response({"error": "Not allowed"}, status=403)

        serializer = PropertyCreateSerializer(prop, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Updated successfully"})
        return Response(serializer.errors)


class DeletePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, slug):
        prop = get_object_or_404(Property, slug=slug)

        if prop.agent != request.user:
            return Response({"error": "Not allowed"}, status=403)

        prop.delete()
        return Response({"message": "Deleted successfully"})
