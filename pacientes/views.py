from rest_framework import viewsets
from .models import TipoAfiliacion, HistorialesClinicos
from .serializer import TipoAfiliacionSerializer, HistorialesClinicosSerializer

class TipoAfiliacionView(viewsets.ModelViewSet):
    serializer_class = TipoAfiliacionSerializer
    queryset = TipoAfiliacion.objects.all()

class HistorialesClinicosView(viewsets.ModelViewSet):
    serializer_class = HistorialesClinicosSerializer
    queryset = HistorialesClinicos.objects.all()
