from django.contrib import admin
from .models import Project, ProjectImage, ProjectCategory, Award


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("name", "slug")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "client", "category", "status", "is_featured", "is_active")
    list_filter = ("category", "status", "is_featured", "is_active")
    search_fields = ("title", "slug", "client", "location")
    list_editable = ("is_featured", "is_active")
    inlines = [ProjectImageInline]


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ("project", "order")


@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ("title", "organization", "year", "project", "is_active")
    list_filter = ("year", "is_active", "organization")
    search_fields = ("title", "organization", "description")
    list_editable = ("is_active",)

# Register your models here.
