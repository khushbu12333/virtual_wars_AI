from rest_framework import viewsets
from .models import CrowdData, FoodItem, Alert
from .serializers import CrowdDataSerializer, FoodItemSerializer, AlertSerializer

class CrowdDataViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CrowdData.objects.all()
    serializer_class = CrowdDataSerializer

class FoodItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

class AlertViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Alert.objects.all().order_by('-created_at')
    serializer_class = AlertSerializer
