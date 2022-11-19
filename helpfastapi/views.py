from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import OrganizationSerializer, ProfileSerializer, CategoriesSerializer, PreferencesSerializer
from .models import Organization, Profile, Preferences, Categories
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
from google.oauth2 import id_token
from google.auth.transport import requests
from .googleauth import GoogleBackend
from django.db.models import F
import os
import json
import uuid

# The viewsets base class provides the implementation for CRUD operations by default,
# what we had to do was specify the serializer class and the query set.

# Login Auth

@api_view(['POST'])
def login(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    google_id = body["id"]
    user = GoogleBackend.authenticate(request=request, token=google_id)
    if user == None:
        return Response({'error': 'invalid google login'}, status=status.HTTP_403_FORBIDDEN)
    token = Token.objects.get_or_create(user=user)[0]
    profile = user.profile
    serializer = ProfileSerializer(profile)
    return Response({'token': token.key, "profile": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def signup(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    try:
        google_id = body["id"]
        idinfo = id_token.verify_oauth2_token(google_id, requests.Request())
    except requests.exceptions.GoogleAuthError:
        # Invalid token
        return Response({"error": "invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    username = uuid.uuid4().hex[:30]
    password = "".join(uuid.uuid4().hex[:30].split('-'))
    email = idinfo["email"]
    first = idinfo["given_name"]
    last = idinfo["family_name"]
    user = User.objects.create_user(username=username, password=password, email=email)
    profile = Profile.objects.create(user=user, firstName=first, lastName=last,email=email)
    serializer = ProfileSerializer(profile)
    return Response({"profile": serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def findmatch(request):
    user = request.user
    organizations = Organization.objects.exclude(seenby=user.id, isTestData=True, approved=False)
    # # This way is very annoying and resitant to change. Try to find another way to do this
    interests = user.profile.interests
    matches = organizations.annotate(rank=(
        F('arts_and_culture') * interests.arts_and_culture + 
        F('charity') * interests.charity +
        F('children') + interests.children
    )).order_by('rank').desc()[:1]
    match1 = OrganizationSerializer(matches[0])
    match2 = OrganizationSerializer(matches[1])
    return Response({"match1": match1.data, "match2": match2.data}, status=status.HTTP_200_OK)

# Test Login/Signup without Google Login

@api_view(['POST'])
def dev_createuser(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    username = uuid.uuid4().hex[:30]
    password = "".join(uuid.uuid4().hex[:30].split('-'))

    email = body["email"]
    first = body["given_name"]
    last = body["family_name"]

    user = User.objects.create_user(username=username, password=password, email=email)

    preferences = Preferences.objects.create()
    if "settings" in body:
        for field, value in body["settings"].items():
            setattr(preferences, field, value)
        preferences.save()
    interests = Categories.objects.create()

    if "interests" in body:
        for field, value in body["interests"].items():
            setattr(interests, field, value)
        interests.save()
    
    profile = Profile.objects.create(user=user, settings=preferences, interests=interests, firstName=first, lastName=last, email=email)
    serializer = ProfileSerializer(profile)
    token = Token.objects.create(user=user)

    return Response({"token": token.key, "profile": serializer.data}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def dev_login(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email = body["email"]
    try:
        profile = Profile.objects.get(email=email)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_403_FORBIDDEN)
    user = profile.user
    token = Token.objects.get_or_create(user=user)[0]
    serializer = ProfileSerializer(profile)
    return Response({"token":token.key, "profile": serializer.data}, status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
def dev_createorg(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    categories = Categories.objects.create()
    if "categories" in body:
        for field, value in body["categories"].items():
            setattr(categories, field, value)
        categories.save()
    
    organization = Organization.objects.create(
        name=body["name"], 
        isTestData=body["isTestData"],
        description=body["description"],
        matchInfo = body["matchInfo"],
        email=body["email"],
        categories=categories)
    if "website" in body:
        organization.website = body["website"]
        organization.save()
    if "address" in body:
        organization.address = body["address"]
        organization.save()

    serializer = OrganizationSerializer(organization)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
def preferences_view(request, id):
    try:
        profile = Profile.objects.get(id=id)
        preferences = profile.settings
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PreferencesSerializer(preferences)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PreferencesSerializer(preferences, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def user_interests_view(request, id):
    try:
        profile = Profile.objects.get(id=id)
        interests = profile.interests
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CategoriesSerializer(interests)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PreferencesSerializer(interests, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def org_categories_view(request, id):
    try:
        org = Organization.objects.get(id=id)
        categories = org.categories
    except Organization.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategoriesSerializer(categories)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategoriesSerializer(categories, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrganizationView(viewsets.ModelViewSet):
	serializer_class = OrganizationSerializer
	queryset = Organization.objects.all()
	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['name', 'isTestData']


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()