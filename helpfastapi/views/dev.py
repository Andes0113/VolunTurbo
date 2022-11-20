from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from ..serializers import OrganizationSerializer, ProfileSerializer
from ..models import Organization, Profile, Preferences, Categories
import json
import uuid

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

@api_view(['GET'])
def dev_gettoken(request, id):
    try:
        profile = Profile.objects.get(id=id)
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
