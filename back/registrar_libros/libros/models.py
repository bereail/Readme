from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Libro(models.Model):
    titulo = models.CharField(max_length=255)
    autor = models.CharField(max_length=255, blank=True, null=True)
    genero = models.CharField(max_length=100, blank=True, null=True)
    isbn = models.CharField(max_length=20, blank=True, null=True)
    paginas = models.IntegerField(blank=True, null=True)
    imagen_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.titulo


class Anotacion(models.Model):
    pagina = models.IntegerField()
    texto = models.TextField()
    fecha = models.DateField(auto_now_add=True)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE, related_name="anotaciones")

    def __str__(self):
        return f"Anotación en pág. {self.pagina} de {self.libro.titulo}"


class Lectura(models.Model):  # Este sería el "libro planeado"
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="lecturas")
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE, related_name="lecturas")
    anotacion = models.ForeignKey(Anotacion, on_delete=models.SET_NULL, null=True, blank=True, related_name="lectura_usada")

    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_fin = models.DateField(null=True, blank=True)
    puntaje = models.IntegerField(null=True, blank=True)
    lugar_fin = models.CharField(max_length=100, null=True, blank=True)
    comentario = models.TextField(null=True, blank=True)


    def __str__(self):
        return f"{self.usuario.nombre} leyendo {self.libro.titulo}"
