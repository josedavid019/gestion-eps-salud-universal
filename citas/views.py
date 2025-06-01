from rest_framework import viewsets, status
from .models import Citas, Consultas
from .serializer import CitasSerializer, ConsultasSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from datetime import datetime

class CitasView(viewsets.ModelViewSet):
    serializer_class = CitasSerializer
    queryset = Citas.objects.all()

class ConsultasView(viewsets.ModelViewSet):
    serializer_class = ConsultasSerializer
    queryset = Consultas.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        cita_id = self.request.query_params.get('cita_id')
        if cita_id:
            queryset = queryset.filter(cita_id=cita_id)
        return queryset

@api_view(["GET"])
def fechas_no_disponibles_doctor(request, doctor_id):
    citas = (
        Citas.objects
        .filter(doctor_id=doctor_id)
        .values('fecha_cita')
        .annotate(total=Count('cita_id'))
        .filter(total__gte=10)
        .values_list('fecha_cita', flat=True)
    )
    return Response(list(citas))

@api_view(['GET'])
def horas_ocupadas_doctor(request, doctor_id):
    fecha = request.GET.get("fecha")

    # Validación del formato de la fecha
    if not fecha:
        return Response({"error": "Fecha requerida"}, status=400)

    try:
        fecha = datetime.strptime(fecha, "%Y-%m-%d").date()
    except ValueError:
        return Response({"error": "Formato de fecha inválido, usa YYYY-MM-DD"}, status=400)

    # Filtrar citas por fecha y doctor
    citas = Citas.objects.filter(doctor_id=doctor_id, fecha_cita=fecha)
    horas = citas.values_list("hora_cita", flat=True)

    # Manejar casos en los que no hay citas registradas
    if not horas:
        return Response([], status=200)

    horas_str = [hora.strftime("%H:%M") for hora in horas if hora is not None]
    return Response(horas_str)

@api_view(['GET'])
def citas_por_paciente(request, usuario_id):
    citas = Citas.objects.filter(usuario_id=usuario_id).order_by('-fecha_cita', '-hora_cita')
    serializer = CitasSerializer(citas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def consultas_por_paciente(request, usuario_id):
    consultas = Consultas.objects.filter(cita__usuario_id=usuario_id).order_by('-fecha_atencion', '-fecha_creacion')
    serializer = ConsultasSerializer(consultas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
