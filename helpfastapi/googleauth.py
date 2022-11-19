from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from .models import Profile
from google.oauth2 import id_token
from google.auth.transport import requests
import uuid


class GoogleBackend(BaseBackend):
    def authenticate(request, token=None):
        print(token)
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request())
        except requests.exceptions.GoogleAuthError:
            return None
        try:
            profile = Profile.objects.get(email=idinfo["email"])
        except Profile.DoesNotExist:
            username = uuid.uuid4().hex[:30]
            password = "".join(uuid.uuid4().hex[:30].split('-'))
            email = idinfo["email"]
            first = idinfo["given_name"]
            last = idinfo["family_name"]
            user = User.objects.create_user(username=username, password=password, email=email)
            profile = Profile.objects.create(user=user, firstName=first, lastName=last,email=email)
        return profile.user
