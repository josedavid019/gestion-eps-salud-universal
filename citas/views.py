from rest_framework import viewsets
from .models import Citas, Consultas
from .serializer import CitasSerializer, ConsultasSerializer

class CitasView(viewsets.ModelViewSet):
    serializer_class = CitasSerializer
    queryset = Citas.objects.all()

class ConsultasView(viewsets.ModelViewSet):
    serializer_class = ConsultasSerializer
    queryset = Consultas.objects.all()