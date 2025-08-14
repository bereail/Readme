from rest_framework import serializers
from .models import Libro, Lectura, Anotacion


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = '__all__'


class AnotacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anotacion
        fields = '__all__'


class LecturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lectura
        fields = '__all__'

    def validate_puntaje(self, value):
        if value is not None and not (0 <= value <= 5):
            raise serializers.ValidationError('El puntaje debe estar entre 0 y 5.')
        return value

    def validate(self, attrs):
        fecha_inicio = attrs.get('fecha_inicio') or getattr(self.instance, 'fecha_inicio', None)
        fecha_fin = attrs.get('fecha_fin') or getattr(self.instance, 'fecha_fin', None)
        if fecha_fin and fecha_inicio and fecha_fin < fecha_inicio:
            raise serializers.ValidationError('La fecha de fin debe ser mayor o igual a la fecha de inicio.')
        return attrs
