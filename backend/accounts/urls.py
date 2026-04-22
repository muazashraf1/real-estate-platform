
from django.urls import path
from  rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views

urlpatterns = [
    path('register/', views.RegisterView.as_view() ), 
    path('profile/', views.ProfileView.as_view()), 


    #For JWT authenticaation
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view())
]