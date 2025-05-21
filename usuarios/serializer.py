from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'usuario_id',
            'email',
            'password',
            'primer_nombre',
            'segundo_nombre',
            'primer_apellido',
            'segundo_apellido',
            'fecha_creacion',
            'fecha_actualizacion',
            'activo',
            'role',
        ]