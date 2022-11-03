from django.db import models
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Organization(models.Model):
	# If env = dev, then doesn't check this when getting. Otherwise does. 
	isTestData = models.BooleanField(default=False)
	# Viewable in default viewing screen
	name = models.CharField(max_length=50)
	categories = ArrayField(
		models.CharField(max_length=20, blank=True),
	)
	# Viewable in more info
	description = models.TextField()
	website = models.CharField(max_length=50)
	# Viewable after matching
	matchInfo = models.TextField()
	email = models.CharField(max_length=255)
	
	def __str__(self):
		return self.name