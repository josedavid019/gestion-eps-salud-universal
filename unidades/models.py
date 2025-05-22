from django.db import models

class UnidadesMedicas(models.Model):
    unidad_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=255)
    planta = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre