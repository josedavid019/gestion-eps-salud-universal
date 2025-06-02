from django.urls import path, include
from rest_framework import routers
from .views import UnidadesMedicasView, UnidadesMedicasConDoctorView, listar_doctores_con_unidad

router = routers.DefaultRouter()
router.register(r'unidades', UnidadesMedicasView, 'unidades-medicas')
router.register(r"unidades-con-doctor", UnidadesMedicasConDoctorView, basename="unidades-con-doctor")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/doctores/', listar_doctores_con_unidad, name='unidades-con-doctores'),
]