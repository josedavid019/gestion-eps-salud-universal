from django.urls import path, include
from rest_framework import routers
from .views import CitasView, ConsultasView

router = routers.DefaultRouter()
router.register(r'citas', CitasView, 'citas')
router.register(r'consultas', ConsultasView, 'consultas')

urlpatterns = [
    path('api/', include(router.urls)),
]