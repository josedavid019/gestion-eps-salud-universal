from rest_framework import serializers
from .models import citas, consultas

class citasSerializer(serializers.ModelSerializer):
    class Meta:
        model = citas
        fields = [
            'cita_id',
            'fecha_cita',
            'estado',
            'fecha_creacion',
            'fecha_actualizacion',
            'paciente',
            'doctor',
            'unidad',
        ]

class consultasSerializer(serializers.ModelSerializer):
    class Meta:
        model = consultas
        fields = [
            'consulta_id',
            'fecha_atencion',
            'sintomas',
            'tratamiento',
            'fecha_creacion',
            'fecha_actualizacion',
            'cita',
        ]