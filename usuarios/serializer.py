from rest_framework import serializers
from .models import Usuarios, Roles
from pacientes.models import TipoAfiliacion
from doctores.models import JornadasLaborales
from unidades.models import UnidadesMedicas
from django.contrib.auth.hashers import make_password, check_password
from django.db import transaction
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = [
            'role_id',
            'nombre',
            'descripcion',
            'fecha_creacion',
            'fecha_actualizacion'
        ]

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = [
            'usuario_id',
            'identificacion',
            'password',
            'primer_nombre',
            'segundo_nombre',
            'primer_apellido',
            'segundo_apellido',
            'genero',
            'email',
            'direccion',
            'telefono',
            'fecha_nacimiento',
            'especialidad',
            'fecha_ingreso',
            'fecha_creacion',
            'fecha_actualizacion',
            'activo',
            'role',
            'afiliacion',
            'jornada',
            'unidad',
        ]

class UsuarioRegisterSerializer(serializers.Serializer):
    # Campos necesarios para registro (rol paciente)
    identificacion = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField()
    role = serializers.PrimaryKeyRelatedField(queryset=Roles.objects.all())

    primer_nombre = serializers.CharField()
    segundo_nombre = serializers.CharField(required=False, allow_blank=True)
    primer_apellido = serializers.CharField()
    segundo_apellido = serializers.CharField(required=False, allow_blank=True)
    genero = serializers.ChoiceField(choices=[("M", "Masculino"), ("F", "Femenino")])
    direccion = serializers.CharField()
    telefono = serializers.CharField()
    fecha_nacimiento = serializers.DateField()
    especialidad = serializers.CharField(required=False, allow_blank=True)
    fecha_ingreso = serializers.DateField()
    afiliacion = serializers.PrimaryKeyRelatedField(queryset=TipoAfiliacion.objects.all(), required=False, allow_null=True)
    jornada = serializers.PrimaryKeyRelatedField(queryset=JornadasLaborales.objects.all(), required=False, allow_null=True)
    unidad = serializers.PrimaryKeyRelatedField(queryset=UnidadesMedicas.objects.all(), required=False, allow_null=True)

    def validate_email(self, value):
        if Usuarios.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado.")
        return value

    def validate_identificacion(self, value):
        if Usuarios.objects.filter(identificacion=value).exists():
            raise serializers.ValidationError("Esta identificación ya está registrada.")
        return value

    def create(self, validated_data):
        with transaction.atomic():
            password = validated_data.pop("password")
            usuario = Usuarios.objects.create(
                **validated_data,
                password=make_password(password),
            )
            return usuario
        
class CustomTokenObtainSerializer(serializers.Serializer):
    identificacion = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        identificacion = attrs.get("identificacion")
        password = attrs.get("password")

        try:
            usuario = Usuarios.objects.get(identificacion=identificacion)
        except Usuarios.DoesNotExist:
            raise AuthenticationFailed("Identificación o contraseña inválida")

        if not check_password(password, usuario.password):
            raise AuthenticationFailed("Identificación o contraseña inválida")

        refresh = RefreshToken.for_user(usuario)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "usuario_id": usuario.usuario_id,
            "nombres": f"{usuario.primer_nombre} {usuario.primer_apellido}",
            "identificacion": usuario.identificacion,
            "role": usuario.role.nombre
        }