from django.urls import path, include
from rest_framework import routers
from .views import TipoAfiliacionView, HistorialesClinicosView

router = routers.DefaultRouter()
router.register(r'afiliaciones', TipoAfiliacionView, 'tipo-afiliacion')
router.register(r'historiales', HistorialesClinicosView, 'historial-clinico')

urlpatterns = [
    path('api/', include(router.urls)),
]