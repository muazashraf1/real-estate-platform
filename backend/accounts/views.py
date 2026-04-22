from django.shortcuts import render
from rest_framework.response import Response
from accounts.serializers import LoginSerializer, RegisterSerializer, ProfileSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class RegisterView(APIView):
    permission_classes = ([AllowAny])
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message':"User created successfully",})

class LoginView(TokenObtainPairView):
    pass

