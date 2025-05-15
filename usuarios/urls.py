from django.urls import path, include
from rest_framework import routers
from .views import UsuarioView

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioView, 'usuarios')

urlpatterns = [
    path('api/', include(router.urls)),
]