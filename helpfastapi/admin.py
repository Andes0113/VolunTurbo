from django.contrib import admin
from .models import Organization, User, Categories, Preferences

# Register your models here.
admin.site.register(Organization)
admin.site.register(User)
admin.site.register(Categories)
admin.site.register(Preferences)
