from rest_framework import viewsets, status
from .models import Usuarios, Roles
from .serializer import UsuariosSerializer, RolesSerializer, UsuarioRegisterSerializer, CustomTokenObtainSerializer, UsuarioPerfilSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from unidades.models import UnidadesMedicas

class RolesView(viewsets.ModelViewSet):
    serializer_class = RolesSerializer
    queryset = Roles.objects.all()

class UsuariosView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuarios.objects.all()

class UsuarioRegisterView(APIView):
    def post(self, request):
        serializer = UsuarioRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Usuario registrado correctamente"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomLoginView(APIView):
    def post(self, request):
        serializer = CustomTokenObtainSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def doctores_por_unidad(request):
    unidad_id = request.query_params.get('unidad_id')
    if not unidad_id:
        return Response({"error": "unidad_id es requerido"}, status=400)
    
    doctores = Usuarios.objects.filter(role__nombre="doctor", unidad_id=unidad_id)
    serializer = UsuariosSerializer(doctores, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def obtener_jornada_doctor(request, doctor_id):
    try:
        doctor = Usuarios.objects.get(usuario_id=doctor_id)

        # Verifica si el doctor tiene jornada asignada antes de acceder a su atributo
        if doctor.jornada:
            return Response({"jornada": doctor.jornada.nombre}, status=200)
        else:
            return Response({"jornada": None}, status=200)

    except Usuarios.DoesNotExist:
        return Response({"error": "Doctor no encontrado"}, status=404)

    except Exception as e:
        return Response({"error": str(e)}, status=500)  # Captura cualquier error inesperado

@api_view(['GET', 'PUT', 'PATCH'])
def perfil_paciente_por_id(request, usuario_id):
    try:
        usuario = Usuarios.objects.get(pk=usuario_id)
    except Usuarios.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)

    if request.method == 'GET':
        serializer = UsuarioPerfilSerializer(usuario)
        return Response(serializer.data)

    if request.method in ['PUT', 'PATCH']:
        serializer = UsuarioPerfilSerializer(
        usuario,
        data=request.data,
        partial=(request.method == 'PATCH'),
        context={'usuario': usuario, 'request': request}  # paso usuario explícitamente
    )
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Perfil actualizado correctamente"})
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def obtener_doctor_por_unidad(request, unidad_id):
    try:
        unidad = UnidadesMedicas.objects.get(pk=unidad_id)
        if unidad.doctor:
            serializer = UsuariosSerializer(unidad.doctor)
            return Response(serializer.data)
        else:
            return Response({"detail": "La unidad no tiene un doctor asignado."}, status=status.HTTP_404_NOT_FOUND)
    except UnidadesMedicas.DoesNotExist:
        return Response({"detail": "Unidad médica no encontrada."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def listar_pacientes(request):
    pacientes = Usuarios.objects.filter(role__nombre__iexact='paciente')
    serializer = UsuariosSerializer(pacientes, many=True)
    return Response(serializer.data)
