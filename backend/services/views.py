from rest_framework import viewsets, permissions
from .models import Service, ServiceCategory
from .serializers import ServiceSerializer, ServiceCategorySerializer


class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active", "category", "category__slug"]
    search_fields = ["title", "slug", "short_description"]
    ordering_fields = ["order", "title"]


class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    search_fields = ["name", "slug", "description"]
    ordering_fields = ["order", "name"]
