from django.db import models
from authemail.models import EmailUserManager, EmailAbstractUser

class MyUser(EmailAbstractUser):
    # Custom fields
    date_of_birth = models.DateField('Date of birth', null=True, blank=True)

    # Social authentication fields
    social_provider = models.CharField(max_length=30, blank=True)
    social_uid = models.CharField(max_length=255, blank=True)
    social_extra_data = models.JSONField(default=dict, blank=True)

    # Required
    objects = EmailUserManager()
