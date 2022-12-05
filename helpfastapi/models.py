from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from phone_field import PhoneField

import uuid
# Create your models here.


class Categories(models.Model):
	arts_and_culture = models.IntegerField(default=0)
	charity = models.IntegerField(default=0)
	children = models.IntegerField(default=0)
	community = models.IntegerField(default=0)
	disaster_relief = models.IntegerField(default=0)
	emergency = models.IntegerField(default=0)
	education = models.IntegerField(default=0)
	environment = models.IntegerField(default=0)
	faith_based = models.IntegerField(default=0)
	family_support = models.IntegerField(default=0)
	health_and_medicine = models.IntegerField(default=0)
	housing = models.IntegerField(default=0)
	hunger = models.IntegerField(default=0)
	legal = models.IntegerField(default=0)
	mental_health = models.IntegerField(default=0)
	seniors = models.IntegerField(default=0)
	special_needs = models.IntegerField(default=0)
	sports_and_recreation = models.IntegerField(default=0)
	veterans = models.IntegerField(default=0)
	women = models.IntegerField(default=0)
	wildlife = models.IntegerField(default=0)
	pets = models.IntegerField(default=0)
	finance = models.IntegerField(default=0)
	nonprofit = models.IntegerField(default=0)
	def __str__(self):
		return str(self.id)

class Organization(models.Model):
	id = models.UUIDField(
        primary_key = True,
        default = uuid.uuid4,
        editable = False
	)
	# If env = dev, then doesn't check this when getting. Otherwise does. 
	isTestData = models.BooleanField(default=False)
	
	approved = models.BooleanField(default=False)
	# Viewable in default viewing screen
	name = models.CharField(max_length=50)
	categories = models.OneToOneField(
		Categories,
		on_delete=models.CASCADE,
		null=True,
	)
	# Viewable in more info
	description = models.TextField()
	website = models.CharField(max_length=50, blank=True)

	# Geolocation Info
	address = models.CharField(max_length=100)
	latitude = models.FloatField()
	longitude = models.FloatField()
	
	# Viewable after matching
	matchInfo = models.TextField()
	email = models.CharField(max_length=255)
	
	def __str__(self):
		return self.name + " id=" + str(self.id)

	def delete(self, *args, **kwargs):
		self.categories.delete()
		return super(self.__class__, self).delete(*args, **kwargs)


class Preferences(models.Model):
	sendUserData = models.BooleanField(default=False)
	viewRadius = models.PositiveIntegerField(default=10)

class Profile(models.Model):
	user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE, related_name='profile')
	id=	models.UUIDField(
        primary_key = True,
        default = uuid.uuid4,
        editable = False
	)
	# Personal Info
	firstName = models.CharField(max_length=50)
	lastName = models.CharField(max_length=50, default="", unique=False)
	email = models.CharField(max_length=255, default="", unique=True)
	phone = PhoneField(blank=True, null=True)

	# Geolocation Info
	location = models.CharField(max_length=255)
	latitude = models.FloatField()
	longitude = models.FloatField()

	# Matching Info
	interests = models.OneToOneField(
		Categories,
		on_delete=models.CASCADE,
		null=True,
	)
	seen = models.ManyToManyField(Organization, related_name='seenby', blank=True)
	matches = models.ManyToManyField(Organization, related_name='matches', blank=True)

	# Settings
	settings = models.OneToOneField(
		Preferences,
		on_delete=models.CASCADE,
		null=True,
	)

	def delete(self, *args, **kwargs):
		Token.objects.get(user=self.user).delete()
		self.user.delete()
		self.interests.delete()
		self.settings.delete()
		return super(self.__class__, self).delete(*args, **kwargs)

	def __str__(self):
		return self.firstName + " " + self.lastName + " id=" + str(self.id)
