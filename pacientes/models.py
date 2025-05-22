from django.db import models

class TipoAfiliacion(models.Model):
    afiliacion_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class HistorialesClinicos(models.Model):
    historial_id = models.AutoField(primary_key=True)
    resumen_general = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE)

    def __str__(self):
        return self.historial_id