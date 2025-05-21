from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import paciente, historial_clinico
from .serializer import pacienteSerializer, historialClinicoSerializer, PacienteRegisterSerializer

class pacienteView(viewsets.ModelViewSet):
    serializer_class = pacienteSerializer
    queryset = paciente.objects.all()

class historialClinicoView(viewsets.ModelViewSet):
    serializer_class = historialClinicoSerializer
    queryset = historial_clinico.objects.all()

class PacienteRegisterView(APIView):
    def post(self, request):
        serializer = PacienteRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Paciente registrado correctamente"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)