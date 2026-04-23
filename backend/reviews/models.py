from django.db import models
from accounts.models import User

# Create your models here.


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    agent = models.ForeignKey(User, is_agent=True)
    rating = models.IntegerField()
    comment = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
