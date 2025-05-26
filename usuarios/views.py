from rest_framework import viewsets, status
from .models import Usuarios, Roles
from .serializer import UsuariosSerializer, RolesSerializer, UsuarioRegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

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