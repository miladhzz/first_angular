from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import LocationViewSet

router = DefaultRouter(trailing_slash=False)
router.register('locations', LocationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
