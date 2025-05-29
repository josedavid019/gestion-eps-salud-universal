from rest_framework import serializers
from .models import UnidadesMedicas

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
        ]