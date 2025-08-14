from rest_framework.routers import DefaultRouter
from .views import LibroViewSet, LecturaViewSet, AnotacionViewSet

router = DefaultRouter()
router.register(r'libros', LibroViewSet)
router.register(r'lecturas', LecturaViewSet)
router.register(r'anotaciones', AnotacionViewSet)

urlpatterns = router.urls
