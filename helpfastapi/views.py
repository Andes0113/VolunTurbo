from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import OrganizationSerializer, UserSerializer, CategoriesSerializer, PreferencesSerializer
from .models import Organization, User, Preferences
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
# from rest_framework.authtoken.models import Token
import os

# The viewsets base class provides the implementation for CRUD operations by default,
# what we had to do was specify the serializer class and the query set.

@api_view(['GET', 'PUT'])
def preferences_view(request, id):
    try:
        user = User.objects.get(id=id)
        preferences = user.settings
    except:
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
        user = User.objects.get(id=id)
        interests = user.interests
    except:
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

@api_view(['GET', 'POST'])
def org_categories_view(request, id):
    try:
        org = Organization.objects.get(id=id)
        categories = org.categories
    except:
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


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()