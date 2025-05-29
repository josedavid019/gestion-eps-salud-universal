from django.urls import path, include
from rest_framework import routers
from .views import UsuariosView, RolesView, UsuarioRegisterView, CustomLoginView, doctores_por_unidad, obtener_jornada_doctor

router = routers.DefaultRouter()
router.register(r'usuarios', UsuariosView, 'usuarios')
router.register(r'roles', RolesView, 'roles')

urlpatterns = [
    path('api/', include(router.urls)),
    path("api/registrar/", UsuarioRegisterView.as_view(), name="usuario-registrar"),
    path("api/login/", CustomLoginView.as_view(), name="login"),
    path('api/doctores/', doctores_por_unidad, name='doctores-por-unidad'),
    path('api/doctores/<int:doctor_id>/jornada/', obtener_jornada_doctor, name='obtener-jornada-doctor'),
]