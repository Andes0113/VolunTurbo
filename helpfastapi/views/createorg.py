from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import OrganizationSerializer
from ..models import Organization, Categories
from geopy.geocoders import Nominatim
import json

@api_view(['POST'])
def createorg(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    categories = Categories.objects.create()
    if "categories" in body:
        for field, value in body["categories"].items():
            setattr(categories, field, value)
        categories.save()

    # Get Coords of Inputted Address
    address = body["address"]
    geolocator = Nominatim(user_agent="VolunTurbo")
    location = geolocator.geocode(address)
    if location is None:
        return Response({"Error": "Invalid Address"}, status=status.HTTP_400_BAD_REQUEST)
    
    organization = Organization.objects.create(
        name=body["name"], 
        isTestData=body["isTestData"],
        description=body["description"],
        matchInfo = body["matchInfo"],
        email=body["email"],
        address=location,
        latitude=location.latitude,
        longitude=location.longitude,
        categories=categories)
    if "website" in body:
        organization.website = body["website"]
        organization.save()
    
    serializer = OrganizationSerializer(organization)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def dev_approveorg(request, id):
    try:
        organization = Organization.objects.get(id=id)
    except Organization.DoesNotExist:
        return Response(status=status.HTTP_403_FORBIDDEN)
    organization.approved = True
    return Response(status.HTTP_202_ACCEPTED)