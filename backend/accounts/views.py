from django.shortcuts import render
from rest_framework.response import Response
from accounts.serializers import (
    RegisterSerializer,
    ProfileSerializer,
    CustomTokenSerializer,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404

# Create your views here.


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"})

        return Response(serializer.errors, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(
        self, request
    ):  #  FIX (POST → PATCH) this is for strong check k user sirf apni hi profile edit kr skta hai

        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated!"})
        return Response(serializer.errors, status=400)


# class LoginView(TokenObtainPairView):
#     pass


# agent profile publicly viewable by this
class PublicProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, user_id):
        from accounts.models import User, Profile

        # user = User.objects.get(id=user_id)
        user = get_object_or_404(User, id=user_id)
        # profile = user.profile
        profile, created = Profile.objects.get_or_create(user=user)

        data = {
            "username": user.username,
            "is_agent": user.is_agent,
            "bio": profile.bio,
            "location": profile.location,
        }

        return Response(data)


class CustomTokenObtainPairView(
    TokenObtainPairView
):  # for adding the metadata in AccessToken
    serializer_class = CustomTokenSerializer
