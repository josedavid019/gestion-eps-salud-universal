from rest_framework import serializers
from .models import Citas, Consultas
from usuarios.models import Usuarios
from unidades.models import UnidadesMedicas
from usuarios.serializer import UsuariosSerializer
from unidades.serializer import UnidadesMedicasSerializer

class CitasSerializer(serializers.ModelSerializer):
    doctor = serializers.PrimaryKeyRelatedField(queryset=Usuarios.objects.all())
    unidad = serializers.PrimaryKeyRelatedField(queryset=UnidadesMedicas.objects.all())
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuarios.objects.all())

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

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['usuario'] = UsuariosSerializer(instance.usuario).data
        rep['doctor'] = UsuarioDoctorSerializer(instance.doctor).data if instance.doctor else None
        rep['unidad'] = UnidadesMedicasSerializer(instance.unidad).data
        return rep

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

class UsuarioDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = [
            'usuario_id',
            'primer_nombre',
            'primer_apellido',
        ]

class UnidadMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadesMedicas
        fields = [
            'unidad_id',
            'nombre',
        ]