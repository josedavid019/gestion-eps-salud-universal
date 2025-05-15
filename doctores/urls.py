from django.urls import path, include
from rest_framework import routers
from .views import doctorView

router = routers.DefaultRouter()
router.register(r'doctores', doctorView, 'doctores')

urlpatterns = [
    path('api/', include(router.urls)),
]