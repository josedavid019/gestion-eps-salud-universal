from rest_framework import serializers
from .models import Citas, Consultas

class CitasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citas
        fields = [
            'cita_id',
            'fecha_cita',
            'hora_cita',
            'estado',
            'fecha_creacion',
            'fecha_actualizacion',
            'usuario',
            'doctor',
            'unidad',
        ]

class ConsultasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultas
        fields = [
            'consulta_id',
            'fecha_atencion',
            'sintomas',
            'tratamiento',
            'recomendaciones',
            'fecha_creacion',
            'fecha_actualizacion',
            'cita',
        ]