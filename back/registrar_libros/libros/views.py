from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from .models import Libro, Lectura, Anotacion
from .serializers import LibroSerializer, LecturaSerializer, AnotacionSerializer
from .filters import LecturaFilter


class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class AnotacionViewSet(viewsets.ModelViewSet):
    queryset = Anotacion.objects.all()
    serializer_class = AnotacionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LecturaViewSet(viewsets.ModelViewSet):
    queryset = Lectura.objects.all()
    serializer_class = LecturaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = LecturaFilter
