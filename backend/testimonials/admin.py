from django.contrib import admin
from .models import Testimonial, ClientFeedback


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("author_name", "company", "rating", "is_approved", "is_active", "submitted_by_client")
    list_filter = ("rating", "is_active", "is_approved", "submitted_by_client")
    search_fields = ("author_name", "company", "content")
    list_editable = ("is_approved", "is_active")
    actions = ["approve_testimonials", "deactivate_testimonials"]

    def approve_testimonials(self, request, queryset):
        queryset.update(is_approved=True, is_active=True)
        self.message_user(request, f"Approved {queryset.count()} testimonials.")
    approve_testimonials.short_description = "Approve selected testimonials"

    def deactivate_testimonials(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f"Deactivated {queryset.count()} testimonials.")
    deactivate_testimonials.short_description = "Deactivate selected testimonials"


@admin.register(ClientFeedback)
class ClientFeedbackAdmin(admin.ModelAdmin):
    list_display = ("author_name", "company", "project_name", "rating", "is_reviewed", "is_approved", "created_at")
    list_filter = ("rating", "is_reviewed", "is_approved", "created_at")
    search_fields = ("author_name", "company", "content", "project_name")
    list_editable = ("is_reviewed", "is_approved")
    readonly_fields = ("created_at", "updated_at")
    actions = ["approve_and_convert_to_testimonial", "mark_as_reviewed"]
    
    fieldsets = (
        ("Client Information", {
            "fields": ("author_name", "author_title", "author_email", "company")
        }),
        ("Feedback Content", {
            "fields": ("content", "rating", "project_name")
        }),
        ("Review Status", {
            "fields": ("is_reviewed", "is_approved", "admin_notes")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at")
        }),
    )

    def approve_and_convert_to_testimonial(self, request, queryset):
        count = 0
        for feedback in queryset.filter(is_approved=False):
            # Create testimonial from feedback
            Testimonial.objects.create(
                author_name=feedback.author_name,
                author_title=feedback.author_title,
                content=feedback.content,
                company=feedback.company,
                rating=feedback.rating,
                is_active=True,
                is_approved=True,
                submitted_by_client=True
            )
            feedback.is_approved = True
            feedback.is_reviewed = True
            feedback.save()
            count += 1
        self.message_user(request, f"Approved and converted {count} feedback submissions to testimonials.")
    approve_and_convert_to_testimonial.short_description = "Approve and convert to testimonials"

    def mark_as_reviewed(self, request, queryset):
        queryset.update(is_reviewed=True)
        self.message_user(request, f"Marked {queryset.count()} submissions as reviewed.")
    mark_as_reviewed.short_description = "Mark as reviewed"

# Register your models here.
