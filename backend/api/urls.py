from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CrowdDataViewSet, FoodItemViewSet, AlertViewSet

router = DefaultRouter()
router.register(r'crowd', CrowdDataViewSet)
router.register(r'food', FoodItemViewSet)
router.register(r'alerts', AlertViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
