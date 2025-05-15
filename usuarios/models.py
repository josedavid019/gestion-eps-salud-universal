from django.db import models

class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    contrasena = models.CharField(max_length=255)
    primer_nombre = models.CharField(max_length=100)
    segundo_nombre = models.CharField(max_length=100, blank=True, null=True)
    primer_apellido = models.CharField(max_length=100)
    segundo_apellido = models.CharField(max_length=100, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.primer_nombre} {self.primer_apellido}"