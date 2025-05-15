from rest_framework import serializers
from .models import paciente, historial_clinico

class pacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = paciente
        fields = [
            'paciente_id',
            'identificacion',
            'direccion',
            'edad',
            'fecha_ingreso',
            'fecha_creacion',
            'fecha_actualizacion',
            'usuario',
            'afiliacion',
        ]

class historialClinicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = historial_clinico
        fields = [
            'historial_id',
            'resumen_general',
            'ultima_actualizacion',
            'paciente',
        ]