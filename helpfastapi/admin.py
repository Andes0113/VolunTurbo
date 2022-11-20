from django.contrib import admin
from .models import Organization, Profile, Categories, Preferences

# Register your models here.
admin.site.register(Organization)
admin.site.register(Profile)
admin.site.register(Categories)
admin.site.register(Preferences)
