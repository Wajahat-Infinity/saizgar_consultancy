from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Sector(TimestampedModel):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    short_description = models.CharField(max_length=300, blank=True)
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    cover_image = models.ImageField(upload_to="sectors/", blank=True, null=True)
    
    # Detailed content
    overview = models.TextField(blank=True, null=True)
    capabilities = models.JSONField(default=list, blank=True)  # List of capabilities
    key_projects = models.JSONField(default=list, blank=True)  # List of featured projects
    
    # Statistics
    projects_count = models.CharField(max_length=50, blank=True, null=True)
    capacity_value = models.CharField(max_length=50, blank=True, null=True)
    capacity_label = models.CharField(max_length=50, blank=True, null=True)
    coverage_value = models.CharField(max_length=50, blank=True, null=True)
    coverage_label = models.CharField(max_length=50, blank=True, null=True)
    
    # SEO and ordering
    meta_title = models.CharField(max_length=200, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self) -> str:
        return self.name
