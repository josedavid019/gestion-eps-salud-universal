from rest_framework import serializers
from .models import unidadades_medicas

class unidadadesMediacasSerializer(serializers.ModelSerializer):
    class Meta:
        model = unidadades_medicas
        fields = [
            'unidad_id',
            'nombre',
            'descripcion',
            'planta',
            'fecha_creacion',
            'fecha_actualizacion',
            'doctor',
        ]