from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from ..serializers import ProfileSerializer
from ..models import Organization
from geopy.geocoders import Nominatim
from django.db.models.expressions import RawSQL
import json

def get_nearby_organizations(latitude, longitude, max_distance=5):
    """
    Return objects sorted by distance to specified coordinates
    which distance is less than max_distance given in kilometers
    """
    # Source: https://stackoverflow.com/questions/19703975/django-sort-by-distance

    max_distance_km = max_distance / 0.62137119

    # Great circle distance formula
    gcd_formula = "6371 * acos(least(greatest(\
    cos(radians(%s)) * cos(radians(latitude)) \
    * cos(radians(longitude) - radians(%s)) + \
    sin(radians(%s)) * sin(radians(latitude)) \
    , -1), 1))"
    distance_raw_sql = RawSQL(
        gcd_formula,
        (latitude, longitude, latitude)
    )

    nearby = Organization.objects.all()\
        .annotate(distance=distance_raw_sql)\
        .order_by('distance')\
        .filter(distance__lt=max_distance_km)
    
    return nearby

@api_view(['POST'])
def update_user_location(request):
    token = request.headers['Authorization'][13:]
    user = Token.objects.get(key=token).user
    profile = user.profile
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    if "latitude" in body:
        latitude = body["latitude"]
        longitude = body["longitude"]
    else:
        # Backup if getting lat long fails
        location = body["location"]
        geolocator = Nominatim(user_agent="VolunTurbo")
        location = geolocator.geocode(location)
        latitude = location.latitude
        longitude = location.longitude
        profile.location = location

    profile.latitude = latitude
    profile.longitude = longitude
    profile.save()

    serializer = ProfileSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)