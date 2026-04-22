from rest_framework import serializers
from accounts.models import User, Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Password not match")
        email = data.get("email", "")
        if email and User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email" : "Email already exist"})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User(
            email= validated_data['email'],
            username= validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'profile_image', 'location']

# class LoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['email', 'password']