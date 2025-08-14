import django_filters
from .models import Lectura


class LecturaFilter(django_filters.FilterSet):
    estado = django_filters.CharFilter(method='filter_estado')
    usuario = django_filters.NumberFilter(field_name='usuario_id')

    class Meta:
        model = Lectura
        fields = ['estado', 'usuario']

    def filter_estado(self, queryset, name, value):
        value = value.lower()
        if value == 'planificada':
            return queryset.filter(fecha_inicio__isnull=True)
        if value == 'en_curso':
            return queryset.filter(fecha_inicio__isnull=False, fecha_fin__isnull=True)
        if value == 'finalizada':
            return queryset.filter(fecha_fin__isnull=False)
        return queryset
