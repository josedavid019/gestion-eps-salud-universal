from rest_framework import serializers
from .models import TipoAfiliacion

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