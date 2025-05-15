from rest_framework import viewsets
from .models import citas, consultas
from .serializer import citasSerializer, consultasSerializer

class citasView(viewsets.ModelViewSet):
    serializer_class = citasSerializer
    queryset = citas.objects.all()

class consultasView(viewsets.ModelViewSet):
    serializer_class = consultasSerializer
    queryset = consultas.objects.all()