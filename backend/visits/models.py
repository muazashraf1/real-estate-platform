from django.db import models
from accounts.models import User
from properties.models import Property

# Create your models here.


class VisitRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')

    phone = models.TextField()
    email = models.EmailField(unique=True)

    preferred_date = models.DateTimeField()

    is_reviewed = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)

