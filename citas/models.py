from django.db import models

class citas(models.Model):
    cita_id = models.AutoField(primary_key=True)
    fecha_cita = models.DateTimeField()
    estado = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    paciente = models.ForeignKey('pacientes.paciente', on_delete=models.CASCADE)
    doctor = models.ForeignKey('doctores.doctor', on_delete=models.CASCADE)
    unidad = models.ForeignKey('unidades.unidadades_medicas', on_delete=models.CASCADE)

    def __str__(self):
        return self.estado
    
class consultas(models.Model):
    consulta_id = models.AutoField(primary_key=True)
    fecha_atencion = models.DateTimeField()
    sintomas = models.CharField(max_length=100)
    tratamiento = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    cita = models.ForeignKey(citas, on_delete=models.CASCADE)

    def __str__(self):
        return self.sintomas