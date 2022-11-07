from rest_framework import serializers
from .models import Organization, User, Categories, Preferences


class CategoriesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Categories
		fields = '__all__'

class PreferencesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Preferences
		fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Organization
		fields = '__all__'
		filter_fields = ('name', 'isTestData')


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'
