from django.urls import path, include
from rest_framework import routers
from .views import TipoAfiliacionView

router = routers.DefaultRouter()
router.register(r'afiliaciones', TipoAfiliacionView, 'tipo-afiliacion')

urlpatterns = [
    path('api/', include(router.urls)),
]