from django.urls import path
from .views import GoogleSignInView

urlpatterns = [
    # Add other URL patterns if needed
    path('google/', GoogleSignInView.as_view(), name='handle_google_signin'),
]
