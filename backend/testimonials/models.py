from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Testimonial(TimestampedModel):
    author_name = models.CharField(max_length=150)
    author_title = models.CharField(max_length=150, blank=True)
    content = models.TextField()
    company = models.CharField(max_length=150, blank=True)
    avatar = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    rating = models.PositiveSmallIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)  # Admin approval required
    submitted_by_client = models.BooleanField(default=False)  # Track if client-submitted

    def __str__(self) -> str:
        return f"{self.author_name} - {self.company}"


class ClientFeedback(TimestampedModel):
    """Temporary model for client submissions before admin approval"""
    author_name = models.CharField(max_length=150)
    author_title = models.CharField(max_length=150, blank=True)
    author_email = models.EmailField()
    company = models.CharField(max_length=150, blank=True)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    project_name = models.CharField(max_length=200, blank=True, help_text="Which project was this feedback for?")
    is_reviewed = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    admin_notes = models.TextField(blank=True, help_text="Internal admin notes")

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Client Feedback Submission"
        verbose_name_plural = "Client Feedback Submissions"

    def __str__(self) -> str:
        return f"Feedback from {self.author_name} ({self.company}) - {'Approved' if self.is_approved else 'Pending'}"
