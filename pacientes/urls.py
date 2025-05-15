from django.urls import path, include
from rest_framework import routers
from .views import pacienteView, historialClinicoView

router = routers.DefaultRouter()
router.register(r'pacientes', pacienteView, 'pacientes')
router.register(r'historial-clinico', historialClinicoView, 'historial-clinico')

urlpatterns = [
    path('api/', include(router.urls)),
]