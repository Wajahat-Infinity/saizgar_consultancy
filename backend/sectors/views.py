from rest_framework import viewsets, permissions
from .models import Sector
from .serializers import SectorSerializer


class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active", "is_featured"]
    search_fields = ["name", "slug", "description"]
    ordering_fields = ["order", "name"]
    lookup_field = "slug"
