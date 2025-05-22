from rest_framework import serializers
from .models import TipoAfiliacion, HistorialesClinicos

class TipoAfiliacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAfiliacion
        fields = [
            'afiliacion_id',
            'nombre',
            'descripcion',
            'fecha_creacion',
            'fecha_actualizacion'
        ]

class HistorialesClinicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialesClinicos
        fields = [
            'historial_id',
            'resumen_general',
            'fecha_creacion',
            'fecha_actualizacion',
            'usuario'
        ]