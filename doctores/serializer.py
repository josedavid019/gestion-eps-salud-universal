from rest_framework import serializers
from .models import JornadasLaborales

class JornadasLaboralesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JornadasLaborales
        fields = [
            'jornada_id',
            'nombre',
            'descripcion',
            'fecha_creacion',
            'fecha_actualizacion'
        ]