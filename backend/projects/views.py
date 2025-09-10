from rest_framework import viewsets, permissions
from .models import Project, ProjectImage, ProjectCategory, Award
from .serializers import ProjectSerializer, ProjectImageSerializer, ProjectCategorySerializer, AwardSerializer


class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class ProjectCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order", "name"]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_featured", "is_active", "category", "status"]
    search_fields = ["title", "slug", "client", "location"]
    ordering_fields = ["order", "title", "start_date"]
    lookup_field = "slug"


class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["project"]


class AwardViewSet(viewsets.ModelViewSet):
    queryset = Award.objects.all()
    serializer_class = AwardSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active", "year", "project"]
    ordering_fields = ["order", "year", "title"]
