from rest_framework import viewsets
from .models import UnidadesMedicas
from .serializer import UnidadesMedicasSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from usuarios.models import Usuarios
from usuarios.serializer import UsuariosSerializer

class UnidadesMedicasView(viewsets.ModelViewSet):
    serializer_class = UnidadesMedicasSerializer
    queryset = UnidadesMedicas.objects.all()

@api_view(['GET'])
def listar_doctores_con_unidad(request):
    doctores = Usuarios.objects.filter(role__nombre="doctor")
    serializer = UsuariosSerializer(doctores, many=True)
    return Response(serializer.data)

class UnidadesMedicasConDoctorView(viewsets.ReadOnlyModelViewSet):
    serializer_class = UnidadesMedicasSerializer

    def get_queryset(self):
        return UnidadesMedicas.objects.filter(doctor__isnull=False)
