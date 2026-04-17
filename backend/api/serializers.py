from rest_framework import serializers
from .models import CrowdData, FoodItem, Alert

class CrowdDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrowdData
        fields = '__all__'

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'
