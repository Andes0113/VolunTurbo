from rest_framework import serializers
from .models import Organization, Profile, Categories, Preferences


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
		depth = 1
		filter_fields = ('name', 'isTestData')


class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = '__all__'
		depth = 1
