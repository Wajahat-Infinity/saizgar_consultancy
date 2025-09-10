from rest_framework import viewsets, permissions
from .models import Testimonial
from .serializers import TestimonialSerializer


class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active", "rating"]
    search_fields = ["author_name", "company", "content"]
