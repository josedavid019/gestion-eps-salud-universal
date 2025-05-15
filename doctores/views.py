from rest_framework import viewsets
from .models import doctor
from .serializer import doctorSerializer

class doctorView(viewsets.ModelViewSet):
    serializer_class = doctorSerializer
    queryset = doctor.objects.all()