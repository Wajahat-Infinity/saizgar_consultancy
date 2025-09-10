from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectImageViewSet, ProjectCategoryViewSet, AwardViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'project-images', ProjectImageViewSet)
router.register(r'project-categories', ProjectCategoryViewSet)
router.register(r'awards', AwardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


