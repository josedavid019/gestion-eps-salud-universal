from rest_framework import serializers
from .models import UnidadesMedicas
from usuarios.models import Usuarios

class UsuarioSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['usuario_id', 'primer_nombre', 'primer_apellido', 'email', 'especialidad']

class UnidadesMedicasSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadesMedicas
        fields = [
            'unidad_id',
            'nombre',
            'descripcion',
            'planta',
            'fecha_creacion',
            'fecha_actualizacion',
            'activo',
            'doctor',
        ]