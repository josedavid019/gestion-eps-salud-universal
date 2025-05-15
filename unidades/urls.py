from django.urls import path, include
from rest_framework import routers
from .views import unidadadesMediacasView

router = routers.DefaultRouter()
router.register(r'unidades-medicas', unidadadesMediacasView, 'unidades-medicas')

urlpatterns = [
    path('api/', include(router.urls)),
]