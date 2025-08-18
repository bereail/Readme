# libros/urls.py
from django.urls import path

# Importá cada vista desde su módulo concreto
from .views.open_library_libros import (
    api_home,
    libros_home_openlibrary_random,
    buscar_libros_por_titulo,
)

from .views.api_libros import (
    listar_libros,
    obtener_libro_por_id,
    buscar_libro_por_isbn,
    guardar_libro_por_isbn,
    agregar_libro_leido,
    listar_libros_usuario,
    guardar_libro,
    registrar_lectura,
    guardar_lectura,
    listar_lecturas,
)

urlpatterns = [
    path("", api_home, name="api_home"),

    # Búsquedas (OpenLibrary)
    path("buscar-libros/", buscar_libros_por_titulo, name="buscar_libros_por_titulo"),
    path("libros-inicio/", libros_home_openlibrary_random, name="libros_inicio"),

    # CRUD / listados locales
    path("libros/", listar_libros, name="listar_libros"),
    path("libro/<int:id>/", obtener_libro_por_id, name="obtener_libro_por_id"),

    # Guardados
    path("guardar-libro/", guardar_libro, name="guardar_libro"),
    path("guardar-libro/<str:isbn>/<int:id_usuario>/", guardar_libro_por_isbn, name="guardar_libro_por_isbn"),

    # Lecturas
    path("registrar-lectura/", registrar_lectura, name="registrar_lectura"),
    path("guardar-lectura/", guardar_lectura, name="guardar_lectura"),
    path("lecturas/", listar_lecturas, name="listar_lecturas"),

    # “Leídos” y “mis libros”
    path("libros-leidos/", agregar_libro_leido, name="libros_leidos"),
    path("mis-libros/", listar_libros_usuario, name="mis_libros"),
]
