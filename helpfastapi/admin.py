from django.contrib import admin
from .models import Todo, Organization, User

# Register your models here.
admin.site.register(Todo)
admin.site.register(Organization)
admin.site.register(User)
