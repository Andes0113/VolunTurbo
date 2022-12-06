from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from ..serializers import CategoriesSerializer, PreferencesSerializer, ProfileSerializer
from ..models import Organization

@api_view(['GET', 'PUT'])
def user_preferences_view(request):
    try:
        token = request.headers['Authorization'][13:]
        user = Token.objects.get(key=token).user
        profile = user.profile
        preferences = profile.settings
    except User.DoesNotExist:
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
def user_interests_view(request):
    try:
        token = request.headers['Authorization'][13:]
        user = Token.objects.get(key=token).user
        profile = user.profile
        interests = profile.interests
    except User.DoesNotExist:
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
