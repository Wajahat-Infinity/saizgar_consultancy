from django.contrib import admin
from .models import Service, ServiceCategory


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("name", "slug", "description")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "slug", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("title", "slug", "short_description")
    prepopulated_fields = {"slug": ("title",)}

# Register your models here.
