from django.db import models
from accounts.models import User
from django.utils.text import slugify


class Property(models.Model):
    agent = models.ForeignKey(User, on_delete=models.CASCADE, is_agent=True)

    title = models.TextField()
    description = models.TextField(blank=True, null=True)
    Price = models.IntegerField()
    property_status = [("sale", "For sale"), ("rent", "For Rent")]
    property_type = [
        ("residentail", "Residentail"),
        ("commercial", "Commercial"),
        ("industrial", "Industrial"),
        ("agricultural", "Agricultural"),
    ]

    city = models.TextField(null=True)
    address = models.TextField(null=True)

    slug = models.SlugField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class PropertyImage(models.Model):
    properties = models.ForeignKey(Property)
    image  = models.ImageField(upload_to='properties/')
    is_primary = models.BooleanField(default=True)

class PropertyFeature(models.Model):
    properties =  models.ForeignKey(Property)
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
