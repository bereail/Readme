import requests
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json  # ✅ Para usar json.loads
from libros.models import Usuario, Libro, Anotacion


def libros_home_openlibrary_random(request):
    # Lista de palabras clave genéricas
    palabras_clave = ["fiction", "science", "history", "poetry", "philosophy", "art", "mystery", "travel"]
    busqueda = random.choice(palabras_clave)

    url = f"https://openlibrary.org/search.json?q={busqueda}"
    response = requests.get(url)

    if response.status_code != 200:
        return JsonResponse({"error": "No se pudo consultar OpenLibrary"}, status=500)

    data = response.json()

    # Elegir 8 libros al azar entre los primeros 40 resultados
    docs = data.get("docs", [])[:40]
    libros_elegidos = random.sample(docs, min(8, len(docs)))

    libros = []
    for doc in libros_elegidos:
        libros.append({
            "titulo": doc.get("title"),
            "autor": doc.get("author_name", ["Desconocido"])[0],
            "anio": doc.get("first_publish_year"),
            "isbn": doc.get("isbn", [""])[0],
            "portada": f"https://covers.openlibrary.org/b/isbn/{doc.get('isbn', [''])[0]}-L.jpg" if doc.get("isbn") else None,
        })

    return JsonResponse(libros, safe=False)


@csrf_exempt
@require_http_methods(["POST"])
def guardar_libro(request):
    data = json.loads(request.body)
    usuario = Usuario.objects.get(id=data["usuario_id"])

    libro = Libro.objects.create(
        titulo=data["titulo"],
        autor=data["autor"],
        genero=data.get("genero"),
        isbn=data["isbn"],
        paginas=data.get("paginas"),
        imagen_url=data["imagen_url"],
        usuario=usuario,
    )
    return JsonResponse({"mensaje": "Libro guardado correctamente", "libro_id": libro.id})
