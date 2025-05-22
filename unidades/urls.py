from django.urls import path, include
from rest_framework import routers
from .views import UnidadesMedicasView

router = routers.DefaultRouter()
router.register(r'unidades', UnidadesMedicasView, 'unidades-medicas')

urlpatterns = [
    path('api/', include(router.urls)),
]