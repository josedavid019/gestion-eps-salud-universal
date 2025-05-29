from rest_framework import viewsets
from .models import UnidadesMedicas
from .serializer import UnidadesMedicasSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from usuarios.models import Usuarios

class UnidadesMedicasView(viewsets.ModelViewSet):
    serializer_class = UnidadesMedicasSerializer
    queryset = UnidadesMedicas.objects.all()

@api_view(['GET'])
def unidades_con_doctores(request):
    # Filtrar unidades que tengan al menos un doctor asignado
    unidades_ids_con_doctor = Usuarios.objects.filter(
        role__nombre="doctor", unidad__isnull=False
    ).values_list('unidad_id', flat=True).distinct()

    unidades = UnidadesMedicas.objects.filter(unidad_id__in=unidades_ids_con_doctor)
    serializer = UnidadesMedicasSerializer(unidades, many=True)
    return Response(serializer.data)