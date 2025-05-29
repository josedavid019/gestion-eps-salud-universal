from django.urls import path, include
from rest_framework import routers
from .views import UnidadesMedicasView, unidades_con_doctores

router = routers.DefaultRouter()
router.register(r'unidades', UnidadesMedicasView, 'unidades-medicas')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/doctores/', unidades_con_doctores, name='unidades-con-doctores'),
]