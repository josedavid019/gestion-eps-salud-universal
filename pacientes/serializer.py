from rest_framework import serializers
from .models import paciente, historial_clinico, tipo_afiliacion
from usuarios.models import Usuario, Role
from django.contrib.auth.hashers import make_password
from django.db import transaction

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

class PacienteRegisterSerializer(serializers.Serializer):
    # Datos del usuario
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())

    # Datos del paciente
    identificacion = serializers.CharField()
    primer_nombre = serializers.CharField()
    segundo_nombre = serializers.CharField(required=False, allow_blank=True)
    primer_apellido = serializers.CharField()
    segundo_apellido = serializers.CharField(required=False, allow_blank=True)
    direccion = serializers.CharField()
    edad = serializers.IntegerField()
    afiliacion = serializers.PrimaryKeyRelatedField(queryset=tipo_afiliacion.objects.all())
    fecha_ingreso = serializers.DateField()

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado.")
        return value

    def validate_identificacion(self, value):
        if paciente.objects.filter(identificacion=value).exists():
            raise serializers.ValidationError("Esta identificación ya existe.")
        return value

    def create(self, validated_data):
        with transaction.atomic():
            password = validated_data.pop("password")
            email = validated_data.pop("email")
            role = validated_data.pop("role")

            primer_nombre = validated_data.pop("primer_nombre")
            segundo_nombre = validated_data.pop("segundo_nombre", "")
            primer_apellido = validated_data.pop("primer_apellido")
            segundo_apellido = validated_data.pop("segundo_apellido", "")

            usuario = Usuario.objects.create(
                email=email,
                primer_nombre=primer_nombre,
                segundo_nombre=segundo_nombre,
                primer_apellido=primer_apellido,
                segundo_apellido=segundo_apellido,
                role=role,
                password=make_password(password)
            )

            return paciente.objects.create(usuario=usuario, **validated_data)
