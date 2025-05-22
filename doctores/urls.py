from django.urls import path, include
from rest_framework import routers
from .views import JornadasLaboralesView

router = routers.DefaultRouter()
router.register(r'jornadas', JornadasLaboralesView, 'jornadas-laborales')

urlpatterns = [
    path('api/', include(router.urls)),
]