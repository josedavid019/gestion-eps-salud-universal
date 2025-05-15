from rest_framework import serializers
from .models import doctor

class doctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = doctor
        fields = [
            'doctor_id',
            'identificacion',
            'direccion',
            'telefono',
            'especialidad',
            'fecha_creacion',
            'fecha_actualizacion',
            'jornada',
            'usuario',
        ]