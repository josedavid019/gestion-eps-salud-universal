from rest_framework import viewsets
from .models import UnidadesMedicas
from .serializer import UnidadesMedicasSerializer

class UnidadesMedicasView(viewsets.ModelViewSet):
    serializer_class = UnidadesMedicasSerializer
    queryset = UnidadesMedicas.objects.all()
