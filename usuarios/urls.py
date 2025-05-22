from django.urls import path, include
from rest_framework import routers
from .views import UsuariosView, RolesView

router = routers.DefaultRouter()
router.register(r'usuarios', UsuariosView, 'usuarios')
router.register(r'roles', RolesView, 'roles')

urlpatterns = [
    path('api/', include(router.urls)),
]