from rest_framework import serializers
from .models import Todo, Organization, User

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed']


class OrganizationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Organization
		fields = '__all__'
		filter_fields = ('name', 'isTestData')


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'
