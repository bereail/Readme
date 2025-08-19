import requests
from django.http import JsonResponse
from ..models import Libro, Usuario, Lectura

def api_home(request):
    return JsonResponse({"mensaje": "Bienvenido a la API de Registro de Libros 📚"})


# 🔍 Buscar libro por ISBN (sin guardar en la base de datos)
def buscar_libro_por_isbn(request, isbn):
    url = f"https://openlibrary.org/isbn/{isbn}.json"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        portada = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"

        return JsonResponse({
            "titulo": data.get("title"),
            "autor": data.get("authors", []),
            "paginas": data.get("number_of_pages"),
            "publicado": data.get("publish_date"),
            "isbn": isbn,
            "portada": portada
        })
    else:
        return JsonResponse({"error": "Libro no encontrado"}, status=404)


# 🔠 Buscar libros por título desde OpenLibrary
def buscar_libros_por_titulo(request, titulo):
    url = f"https://openlibrary.org/search.json?title={titulo}"
    response = requests.get(url)

    if response.status_code != 200:
        return JsonResponse({"error": "No se pudo acceder a OpenLibrary"}, status=500)

    data = response.json()
    resultados = []

    for libro in data.get("docs", [])[:15]:
        isbn_list = libro.get("isbn", [])
        isbn = isbn_list[0] if isbn_list else None

        # Intentar con ISBN primero
        if isbn:
            portada = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
        else:
            cover_id = libro.get("cover_i")
            portada = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg" if cover_id else None

        resultados.append({
            "titulo": libro.get("title", "Sin título"),
            "autor": libro.get("author_name", ["Desconocido"])[0],
            "anio": libro.get("first_publish_year"),
            "isbn": isbn,
            "portada": portada
        })

    return JsonResponse(resultados, safe=False)


# 💾 Buscar libro por ISBN y guardarlo en la base de datos
def guardar_libro_por_isbn(request, isbn, id_usuario):
    url = f"https://openlibrary.org/isbn/{isbn}.json"
    response = requests.get(url)

    if response.status_code != 200:
        return JsonResponse({"error": "Libro no encontrado"}, status=404)

    data = response.json()

    try:
        usuario = Usuario.objects.get(id=id_usuario)
    except Usuario.DoesNotExist:
        return JsonResponse({"error": "Usuario no encontrado"}, status=404)

    titulo = data.get("title", "Sin título")
    paginas = data.get("number_of_pages", None)
    imagen_url = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
    autor_nombre = "Desconocido"

    autores = data.get("authors", [])
    if autores:
        autor_key = autores[0].get("key", "")
        autor_resp = requests.get(f"https://openlibrary.org{autor_key}.json")
        if autor_resp.status_code == 200:
            autor_data = autor_resp.json()
            autor_nombre = autor_data.get("name", "Desconocido")

    libro = Libro.objects.create(
        titulo=titulo,
        autor=autor_nombre,
        paginas=paginas,
        isbn=isbn,
        imagen_url=imagen_url
    )

    # Opcional: también podés registrar la lectura asociada al usuario
    # Lectura.objects.create(usuario=usuario, libro=libro)

    return JsonResponse({
        "id_libro": libro.id,
        "titulo": libro.titulo,
        "autor": libro.autor,
        "isbn": libro.isbn,
        "paginas": libro.paginas,
        "usuario": usuario.nombre,
        "portada": imagen_url
    })


# 📚 Listar lecturas con información del libro y del usuario
def listar_libros(request):
    try:
        lecturas = Lectura.objects.select_related('usuario', 'libro').all()
        data = []

        for lectura in lecturas:
            data.append({
                "id": lectura.id,
                "titulo": lectura.libro.titulo if lectura.libro else "",
                "autor": lectura.libro.autor if lectura.libro else "",
                "isbn": lectura.libro.isbn if lectura.libro else "",
                "imagen_url": lectura.libro.imagen_url if lectura.libro else "",
                "usuario": lectura.usuario.nombre if lectura.usuario else "",
                "fecha_inicio": lectura.fecha_inicio,
                "fecha_fin": lectura.fecha_fin,
                "lugar_fin": lectura.lugar_fin,
                "puntaje": lectura.puntaje,
                "comentario": lectura.comentario,
            })

        return JsonResponse(data, safe=False)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



def listar_lecturas(request):
    try:
        lecturas = Lectura.objects.select_related('usuario', 'libro').all()
        data = []

        for lectura in lecturas:
            data.append({
                "id": lectura.id,
                "titulo": lectura.libro.titulo if lectura.libro else "",
                "autor": lectura.libro.autor if lectura.libro else "",
                "isbn": lectura.libro.isbn if lectura.libro else "",
                "imagen_url": lectura.libro.imagen_url if lectura.libro else "",
                "usuario": lectura.usuario.nombre if lectura.usuario else "",
                "fecha_inicio": lectura.fecha_inicio,
                "fecha_fin": lectura.fecha_fin,
                "lugar_fin": lectura.lugar_fin,
                "puntaje": lectura.puntaje,
                "comentario": lectura.comentario,
            })

        return JsonResponse(data, safe=False)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



def obtener_libro_por_id(request, id):
    try:
        libro = Libro.objects.get(pk=id)
        data = {
            "id": libro.id,
            "titulo": libro.titulo,
            "autor": libro.autor,
            "fecha_inicio": libro.fecha_inicio,
            "fecha_fin": libro.fecha_fin,
            "lugar_fin": libro.lugar_fin,
            "paginas": libro.paginas,
            "puntaje": libro.puntaje,
            "comentario": libro.comentario,
            "imagen_url": libro.imagen_url,
        }
        return JsonResponse(data)
    except Libro.DoesNotExist:
        return JsonResponse({'error': 'Lectura no encontrada'}, status=404)