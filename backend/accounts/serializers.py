from rest_framework import serializers
from accounts.models import User, Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model : User
        fields : ['email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Password not match")
        email = data.get("email", "")
        if email and User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email" : "Email already exist"})
        return data

    def create(self, validate_data):
        user = User.objects.create(
            email= validate_data['email'],
            password= validate_data['password'],
            username= validate_data['username']
        )
        return user
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model : Profile
        fields : '__all__'

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model : User
        fields : ['email', 'password']