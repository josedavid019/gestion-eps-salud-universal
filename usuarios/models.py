from django.db import models

class Roles(models.Model):
    role_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class Usuarios(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    identificacion = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    primer_nombre = models.CharField(max_length=100)
    segundo_nombre = models.CharField(max_length=100, blank=True, null=True)
    primer_apellido = models.CharField(max_length=100)
    segundo_apellido = models.CharField(max_length=100, blank=True, null=True)
    genero = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    especialidad = models.CharField(max_length=100, blank=True, null=True) # Doctor
    fecha_ingreso = models.DateField(blank=True, null=True) # Paciente y Doctor
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
    afiliacion = models.ForeignKey('pacientes.TipoAfiliacion', on_delete=models.CASCADE, blank=True, null=True) # Paciente
    jornada = models.ForeignKey('doctores.JornadasLaborales', on_delete=models.CASCADE, blank=True, null=True) # Doctor
    unidad = models.ForeignKey('unidades.UnidadesMedicas', on_delete=models.CASCADE, blank=True, null=True) # Doctor

    def __str__(self):
        return f"{self.primer_nombre} {self.primer_apellido}"
    
    @property
    def id(self):
        return self.usuario_id