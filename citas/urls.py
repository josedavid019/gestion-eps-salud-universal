from django.urls import path, include
from rest_framework import routers
from .views import CitasView, ConsultasView, fechas_no_disponibles_doctor, horas_ocupadas_doctor

router = routers.DefaultRouter()
router.register(r'citas', CitasView, 'citas')
router.register(r'consultas', ConsultasView, 'consultas')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/fechas/<int:doctor_id>/', fechas_no_disponibles_doctor, name='fechas_no_disponibles_doctor'),
    path("api/doctor/<int:doctor_id>/horas-ocupadas/", horas_ocupadas_doctor, name="horas_ocupadas_doctor"),
]