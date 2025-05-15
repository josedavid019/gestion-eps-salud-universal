from django.urls import path, include
from rest_framework import routers
from .views import citasView, consultasView

router = routers.DefaultRouter()
router.register(r'citas', citasView, 'citas')
router.register(r'consultas', consultasView, 'consultas')

urlpatterns = [
    path('api/', include(router.urls)),
]