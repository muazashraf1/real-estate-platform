from django.urls import path
from properties import views

urlpatterns = [
    path("create/", views.CreatePropertyView.as_view()),
    path("my/", views.MyPropertyListView.as_view()),
    path("<slug:slug>/", views.PropertyDetailView.as_view()),
    path("update/<slug:slug>/", views.UpdatePropertyView.as_view()),
    path("delete/<slug:slug>/", views.DeletePropertyView.as_view()),
]


# ------ Testing in POSTMAN

# 1- register the new user with agent ----> http://127.0.0.1:8000/api/accounts/register/

                    #             {
                    #   "username": "agent2",
                    #   "email": "agent2@gmail.com",
                    #   "password": "123456789",
                    #   "password2": "123456789",
                    #   "is_agent": true
                    # }

# 2- login with that user  --> http://127.0.0.1:8000/api/accounts/token/

            #             {
            #   "email": "agent2@gmail.com",
            #   "password": "123456789"
            # }


# 3- Authorization setting      

# 4- create the property ---> http://127.0.0.1:8000/api/properties/create/
        #         {
        #   "title": "Luxury House Lahore",
        #   "description": "Beautiful house in DHA",
        #   "price": 5000000,
        #   "status": "sale",
        #   "type": "residential",
        #   "city": "Lahore",
        #   "address": "DHA Phase 6"
        # } 
        # non agent sy request bhejny pr errro aaye ga 

# 5- My property getting  --> http://127.0.0.1:8000/api/properties/my/


# 4- update the propert ----> http://127.0.0.1:8000/api/properties/update/luxury-house-lahore/

                # {
                #   "price": 4500000,
                #   "city": "Islamabad"
                # }