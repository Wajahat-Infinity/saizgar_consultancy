from django.contrib import admin
from .models import Sector


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "is_featured", "is_active")
    list_filter = ("is_featured", "is_active")
    search_fields = ("name", "slug", "description")
    list_editable = ("order", "is_featured", "is_active")
    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "slug", "description", "short_description", "icon_name", "cover_image")
        }),
        ("Detailed Content", {
            "fields": ("overview", "capabilities", "key_projects")
        }),
        ("Statistics", {
            "fields": ("projects_count", "capacity_value", "capacity_label", "coverage_value", "coverage_label")
        }),
        ("SEO & Settings", {
            "fields": ("meta_title", "meta_description", "order", "is_featured", "is_active")
        }),
    )

# Register your models here.
