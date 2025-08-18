# libros/views/api_libros.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

from ..models import Libro, Usuario, Lectura  # ajustá si cambia

def listar_libros(request):
    data = list(Libro.objects.values("id", "titulo", "autor", "isbn", "imagen_url")[:50])
    return JsonResponse(data, safe=False)

def obtener_libro_por_id(request, id):
    try:
        libro = Libro.objects.get(pk=id)
        data = {
            "id": libro.id,
            "titulo": libro.titulo,
            "autor": libro.autor,
            "isbn": libro.isbn,
            "imagen_url": libro.imagen_url,
        }
        return JsonResponse(data)
    except Libro.DoesNotExist:
        return JsonResponse({"error": "Libro no encontrado"}, status=404)

@csrf_exempt
@require_http_methods(["POST"])
def guardar_libro(request):
    try:
        body = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    required = ["titulo", "autor", "isbn", "imagen_url"]
    missing = [k for k in required if not body.get(k)]
    if missing:
        return JsonResponse({"error": f"Faltan campos: {', '.join(missing)}"}, status=400)

    libro = Libro.objects.create(
        titulo=body["titulo"],
        autor=body["autor"],
        isbn=body["isbn"],
        imagen_url=body["imagen_url"],
        paginas=body.get("paginas"),
        genero=body.get("genero"),
    )
    return JsonResponse({"mensaje": "Libro guardado", "libro_id": libro.id}, status=201)

# Stubs de las otras vistas para que el import no falle
def buscar_libro_por_isbn(request, isbn): ...
def guardar_libro_por_isbn(request, isbn, id_usuario): ...
def registrar_lectura(request): ...
def guardar_lectura(request): ...
def listar_lecturas(request): ...
def agregar_libro_leido(request): ...
def listar_libros_usuario(request): ...
