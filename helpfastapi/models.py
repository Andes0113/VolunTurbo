from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid
# Create your models here.


class Categories(models.Model):
	wildlife = models.IntegerField(default=0)
	pets = models.IntegerField(default=0)
	religion = models.IntegerField(default=0)
	wildlife = models.IntegerField(default=0)
	finance = models.IntegerField(default=0)
	nonprofit = models.IntegerField(default=0)
	charity = models.IntegerField(default=0)
	children = models.IntegerField(default=0)
	medicine = models.IntegerField(default=0)
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
	address = models.CharField(max_length=50, blank=True)
	# Viewable after matching
	matchInfo = models.TextField()
	email = models.CharField(max_length=255)
	
	def __str__(self):
		return self.name + " id=" + str(self.id)


class Preferences(models.Model):
	sendUserData = models.BooleanField(default=False)
	viewRadius = models.PositiveIntegerField(default=10)

class User(models.Model):
	id=	models.UUIDField(
        primary_key = True,
        default = uuid.uuid4,
        editable = False
	)
	# Personal Info
	firstName = models.CharField(max_length=50)
	lastName = models.CharField(max_length=50, default="", unique=False)
	email = models.CharField(max_length=255, default="", unique=True)
	phone = models.IntegerField(null=False)

	# Matching Info
	interests = models.OneToOneField(
		Categories,
		on_delete=models.CASCADE,
		null=True,
	)
	seen = models.ManyToManyField(Organization, related_name='seen', blank=True)
	matched = models.ManyToManyField(Organization, related_name='matched', blank=True)

	# Settings
	settings = models.OneToOneField(
		Preferences,
		on_delete=models.CASCADE,
		null=True,
	)

	def __str__(self):
		return self.firstName + " " + self.lastName + " id=" + str(self.id)
