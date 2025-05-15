from rest_framework import viewsets
from .models import paciente, historial_clinico
from .serializer import pacienteSerializer, historialClinicoSerializer

class pacienteView(viewsets.ModelViewSet):
    serializer_class = pacienteSerializer
    queryset = paciente.objects.all()

class historialClinicoView(viewsets.ModelViewSet):
    serializer_class = historialClinicoSerializer
    queryset = historial_clinico.objects.all()