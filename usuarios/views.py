from rest_framework import viewsets
from .models import Usuarios, Roles
from .serializer import UsuariosSerializer, RolesSerializer

class RolesView(viewsets.ModelViewSet):
    serializer_class = RolesSerializer
    queryset = Roles.objects.all()

class UsuariosView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuarios.objects.all()
