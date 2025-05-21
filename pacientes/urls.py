from django.urls import path, include
from rest_framework import routers
from .views import pacienteView, historialClinicoView, PacienteRegisterView

router = routers.DefaultRouter()
router.register(r'pacientes', pacienteView, 'paciente')
router.register(r'historial-clinico', historialClinicoView, 'historial-clinico')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/registrar/', PacienteRegisterView.as_view(), name='paciente-registrar'),
]