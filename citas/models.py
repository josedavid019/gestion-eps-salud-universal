from django.db import models

class Citas(models.Model):
    ESTADOS_CITA = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('rechazada', 'Rechazada'),
        ('cancelada', 'Cancelada'),
        ('atendida', 'Atendida'),
        ('no_atendida', 'No Atendida'),
    ]

    cita_id = models.AutoField(primary_key=True)
    fecha_cita = models.DateField()
    hora_cita = models.TimeField()
    estado = models.CharField(max_length=20, choices=ESTADOS_CITA, default='pendiente')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE, related_name='citas_paciente')  # paciente
    doctor = models.ForeignKey('usuarios.Usuarios', on_delete=models.SET_NULL, null=True, related_name='citas_doctor')  # doctor
    unidad = models.ForeignKey('unidades.UnidadesMedicas', on_delete=models.CASCADE)

    def __str__(self):
        return self.cita_id
    
class Consultas(models.Model):
    consulta_id = models.AutoField(primary_key=True)
    fecha_atencion = models.DateField()
    sintomas = models.CharField(max_length=255)
    tratamiento = models.CharField(max_length=255)
    recomendaciones = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    cita = models.ForeignKey(Citas, on_delete=models.CASCADE)

    def __str__(self):
        return self.consulta_id