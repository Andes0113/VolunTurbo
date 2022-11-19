from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from ..serializers import OrganizationSerializer, ProfileSerializer
from ..models import Organization, Profile
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

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