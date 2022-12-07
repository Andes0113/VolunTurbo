"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers
from helpfastapi import views

router = routers.DefaultRouter()
router.register(r'organizations', views.OrganizationView, 'organization')
router.register(r'users', views.ProfileView, 'user')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Base API
	path('api/', include(router.urls)),
    path('api/settings/', views.user_preferences_view),
    path('api/interests/', views.user_interests_view),
    path('api/categories/<uuid:id>/', views.org_categories_view),
    path('api/createorg/', views.createorg),
    path('api/getuser/', views.get_user),
    path('api/clearseen/', views.clearseen),

    # Auth
    path('auth/login/', views.google_login),

    # Matching
    path('match/<uuid:id>/', views.match),
    path('ignore/<uuid:id>/', views.ignore),
    path('findmatch/', views.findmatch),
    path('matches/', views.get_matches),

    # Update Location
    path('updatelocation/', views.update_user_location),

    # Dev Tools for testing; should never be available in production. 
    # Comment out or delete when pushing to heroku. 
    # path('dev/createuser/', views.dev_createuser),
    # path('dev/getusertoken/<uuid:id>/', views.dev_gettoken),
    # path('dev/approve/<uuid:id>/', views.dev_approveorg),

    # React Linking
	re_path('.*', TemplateView.as_view(template_name='index.html')),
]
