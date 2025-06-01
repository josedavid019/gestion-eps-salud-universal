from rest_framework import viewsets
from .models import TipoAfiliacion
from .serializer import TipoAfiliacionSerializer

class TipoAfiliacionView(viewsets.ModelViewSet):
    serializer_class = TipoAfiliacionSerializer
    queryset = TipoAfiliacion.objects.all()
