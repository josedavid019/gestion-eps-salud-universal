from rest_framework import viewsets
from .models import JornadasLaborales
from .serializer import JornadasLaboralesSerializer

class JornadasLaboralesView(viewsets.ModelViewSet):
    serializer_class = JornadasLaboralesSerializer
    queryset = JornadasLaborales.objects.all()