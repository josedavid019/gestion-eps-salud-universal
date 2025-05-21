from django.db import models

class tipo_afiliacion(models.Model):
    afiliacion_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class paciente(models.Model):
    paciente_id = models.AutoField(primary_key=True)
    identificacion = models.CharField(max_length=100, unique=True)
    direccion = models.CharField(max_length=100)
    edad = models.IntegerField()
    fecha_ingreso = models.DateField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)
    afiliacion = models.ForeignKey(tipo_afiliacion, on_delete=models.CASCADE)

    def __str__(self):
        return self.identificacion
    
class historial_clinico(models.Model):
    historial_id = models.AutoField(primary_key=True)
    resumen_general = models.CharField(max_length=100)
    ultima_actualizacion = models.DateTimeField(auto_now=True)
    paciente = models.ForeignKey(paciente, on_delete=models.CASCADE)

    def __str__(self):
        return self.resumen_general