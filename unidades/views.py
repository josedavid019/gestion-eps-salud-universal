from rest_framework import viewsets
from .models import unidadades_medicas
from .serializer import unidadadesMediacasSerializer

class unidadadesMediacasView(viewsets.ModelViewSet):
    serializer_class = unidadadesMediacasSerializer
    queryset = unidadades_medicas.objects.all()
