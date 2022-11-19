from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth.backends import BaseBackend
from ..serializers import ProfileSerializer
from ..models import Profile, Preferences, Categories
from google.oauth2 import id_token
from google.auth.transport import requests
import uuid
import json


class GoogleBackend(BaseBackend):
    def authenticate(request, token=None):
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
            settings = Preferences.objects.create()
            interests = Categories.objects.create()
            profile = Profile.objects.create(
                user=user, 
                firstName=first, 
                lastName=last,
                email=email, 
                settings=settings, 
                interests=interests
            )
        return profile.user
    
    def get_user(self, user_id):
        return User.objects.get(pk=user_id)

@api_view(['POST'])
def google_login(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    google_id = body["id"]
    user = GoogleBackend.authenticate(request, token=google_id)
    if user is None:
        return Response({'error': 'invalid login'}, status=status.HTTP_403_FORBIDDEN)
    token = Token.objects.get_or_create(user=user)[0]
    profile = user.profile
    serializer = ProfileSerializer(profile)
    return Response({'token': token.key, "profile": serializer.data}, status=status.HTTP_200_OK)
