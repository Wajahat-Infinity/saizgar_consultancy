from django.db import models
from django.utils import timezone


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SiteSettings(TimestampedModel):
    site_name = models.CharField(max_length=200, default="Saizgar Engineering")
    logo = models.ImageField(upload_to="site/", blank=True, null=True)
    favicon = models.ImageField(upload_to="site/", blank=True, null=True)
    contact_email = models.EmailField(default="info@saizgar.com")
    contact_phone = models.CharField(max_length=20, default="+92-51-1234567")
    address = models.TextField(default="Islamabad, Pakistan")
    enable_dark_mode = models.BooleanField(default=False)
    show_search = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self) -> str:
        return self.site_name


class NavItem(TimestampedModel):
    label = models.CharField(max_length=100)
    href = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.label


class FooterLink(TimestampedModel):
    label = models.CharField(max_length=100)
    href = models.CharField(max_length=200)
    group = models.CharField(max_length=50, default="main")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["group", "order", "id"]

    def __str__(self) -> str:
        return f"{self.group}: {self.label}"


class Hero(TimestampedModel):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    background_image = models.ImageField(upload_to="hero/", blank=True, null=True)
    cta_label = models.CharField(max_length=100, blank=True)
    cta_href = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class SEO(TimestampedModel):
    page_title = models.CharField(max_length=200, default="Saizgar Engineering")
    meta_description = models.TextField(default="Professional engineering consultancy services")
    keywords = models.TextField(blank=True, default="engineering, consultancy, infrastructure")

    class Meta:
        verbose_name = "SEO"
        verbose_name_plural = "SEO"

    def __str__(self) -> str:
        return self.page_title


class Page(TimestampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["title"]

    def __str__(self) -> str:
        return self.title


class PageSection(TimestampedModel):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="sections")
    identifier = models.CharField(max_length=100)
    heading = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to="pages/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["page", "order", "id"]

    def __str__(self) -> str:
        return f"{self.page.title} - {self.heading}"


class ContactSubmission(TimestampedModel):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=200, blank=True)
    service = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    newsletter = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self) -> str:
        return f"{self.name} - {self.submitted_at.strftime('%Y-%m-%d')}"


class ServiceProcessStep(TimestampedModel):
    step_number = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    activities = models.TextField(blank=True)  # Comma-separated activities
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["step_number"]

    def __str__(self) -> str:
        return f"Step {self.step_number}: {self.title}"


class WhyChooseItem(TimestampedModel):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.title


class OfficeHour(TimestampedModel):
    day = models.CharField(max_length=20, default="Monday")
    hours = models.CharField(max_length=50, default="9:00 AM - 5:00 PM")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return f"{self.day}: {self.hours}"


class QuickStat(TimestampedModel):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return f"{self.value} {self.label}"


class SocialLink(TimestampedModel):
    name = models.CharField(max_length=50)
    url = models.URLField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.name


class Partner(TimestampedModel):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="partners/", blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.name


class CoreValue(TimestampedModel):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return self.title


class Leadership(TimestampedModel):
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    experience = models.CharField(max_length=50, blank=True)
    specialization = models.CharField(max_length=200, blank=True)
    education = models.CharField(max_length=300, blank=True)
    image = models.ImageField(upload_to="leadership/", blank=True, null=True)
    bio = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    linkedin = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return f"{self.name} - {self.position}"


class TimelineEvent(TimestampedModel):
    year = models.CharField(max_length=10)
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, blank=True, null=True)
    achievements = models.JSONField(default=list, blank=True)  # List of achievements
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "year"]

    def __str__(self) -> str:
        return f"{self.year}: {self.title}"