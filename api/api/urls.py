from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    LocationViewSet,
    PhotoUploadView,
)

router = DefaultRouter(trailing_slash=False)
router.register('locations', LocationViewSet)

urlpatterns = [
    path('uploads/photo', PhotoUploadView.as_view(), name='upload-photo'),
    path('', include(router.urls)),
]
