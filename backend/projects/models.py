from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ProjectCategory(TimestampedModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Project Categories"

    def __str__(self) -> str:
        return self.name


class Project(TimestampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    client = models.CharField(max_length=200, blank=True)
    summary = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="projects/", blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True)
    budget = models.CharField(max_length=100, blank=True, null=True)
    sector = models.CharField(max_length=100, blank=True, null=True)
    scope = models.JSONField(default=list, blank=True)  # List of scope items
    impact = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default="Completed", choices=[
        ("Completed", "Completed"),
        ("In Progress", "In Progress"),
        ("Operational", "Operational"),
        ("Planning", "Planning"),
    ])
    category = models.ForeignKey(ProjectCategory, on_delete=models.SET_NULL, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self) -> str:
        return self.title


class ProjectImage(TimestampedModel):
    project = models.ForeignKey(Project, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="projects/gallery/")
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return f"{self.project.title} - {self.order}"


class Award(TimestampedModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    organization = models.CharField(max_length=200, blank=True)
    year = models.PositiveIntegerField(blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True, related_name="awards")
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "year", "title"]

    def __str__(self) -> str:
        return f"{self.title} ({self.year})" if self.year else self.title
