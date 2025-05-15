from django.db import models

class jornadas_laborales(models.Model):
    jornada_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    identificacion = models.CharField(max_length=100, unique=True)
    direccion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=100, unique=True)
    especialidad = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    jornada = models.ForeignKey(jornadas_laborales, on_delete=models.CASCADE)
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)

    def __str__(self):
        return self.identificacion