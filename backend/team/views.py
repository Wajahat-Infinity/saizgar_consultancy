from rest_framework import viewsets, permissions
from .models import TeamMember
from .serializers import TeamMemberSerializer


class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    search_fields = ["name", "role"]
    ordering_fields = ["order", "name"]
