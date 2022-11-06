from rest_framework import serializers
from .models import Organization, User


class OrganizationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Organization
		fields = '__all__'
		filter_fields = ('name', 'isTestData')


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'
