from rest_framework import serializers
from .models import Usuarios, Roles

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = [
            'role_id',
            'nombre',
            'descripcion',
            'fecha_creacion',
            'fecha_actualizacion'
        ]

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = [
            'usuario_id',
            'identificacion',
            'password',
            'primer_nombre',
            'segundo_nombre',
            'primer_apellido',
            'segundo_apellido',
            'genero',
            'email',
            'direccion',
            'telefono',
            'fecha_nacimiento',
            'especialidad',
            'fecha_ingreso',
            'fecha_creacion',
            'fecha_actualizacion',
            'activo',
            'role',
            'afiliacion',
            'jornada'
        ]