# proyecto/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # Toda la API cuelga de /api/
    path("api/", include("libros.urls")),
]
