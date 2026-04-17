from django.contrib import admin
from .models import CrowdData, FoodItem, Alert

admin.site.register(CrowdData)
admin.site.register(FoodItem)
admin.site.register(Alert)
