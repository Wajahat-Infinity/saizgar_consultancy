from rest_framework import viewsets, permissions
from django.core.mail import send_mail
from django.conf import settings
from .models import SiteSettings, NavItem, FooterLink, SEO, Hero, Page, PageSection, ContactSubmission, ServiceProcessStep, WhyChooseItem, OfficeHour, SocialLink, QuickStat, Partner, CoreValue, Leadership, TimelineEvent
from .serializers import (
    SiteSettingsSerializer,
    NavItemSerializer,
    FooterLinkSerializer,
    SEOSerializer,
    HeroSerializer,
    PageSerializer,
    PageSectionSerializer,
    ContactSubmissionSerializer,
    ServiceProcessStepSerializer,
    WhyChooseItemSerializer,
    OfficeHourSerializer,
    SocialLinkSerializer,
    QuickStatSerializer,
    PartnerSerializer,
    CoreValueSerializer,
    LeadershipSerializer,
    TimelineEventSerializer,
)


class ReadOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [ReadOnlyOrAdmin]


class NavItemViewSet(viewsets.ModelViewSet):
    queryset = NavItem.objects.all()
    serializer_class = NavItemSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class FooterLinkViewSet(viewsets.ModelViewSet):
    queryset = FooterLink.objects.all()
    serializer_class = FooterLinkSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active", "group"]
    ordering_fields = ["group", "order"]


class SEOViewSet(viewsets.ModelViewSet):
    queryset = SEO.objects.all()
    serializer_class = SEOSerializer
    permission_classes = [ReadOnlyOrAdmin]


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    lookup_field = "slug"


class PageSectionViewSet(viewsets.ModelViewSet):
    queryset = PageSection.objects.all()
    serializer_class = PageSectionSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["page", "is_active"]
    ordering_fields = ["page", "order"]


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [permissions.AllowAny]  # Allow public submissions
    ordering_fields = ["-submitted_at"]

    def perform_create(self, serializer):
        instance = serializer.save()
        # Determine destination from SiteSettings (fallback to DEFAULT_FROM_EMAIL)
        try:
            site_settings = SiteSettings.objects.first()
        except Exception:
            site_settings = None

        destination_email = (site_settings.contact_email if site_settings and site_settings.contact_email else None) or settings.DEFAULT_FROM_EMAIL

        # Send email notification to admin-configured address
        try:
            subject = f"New Contact Submission: {instance.name}"
            message = (
                "New contact form submission:\n\n"
                f"Name: {instance.name}\n"
                f"Email: {instance.email}\n"
                f"Phone: {instance.phone}\n"
                f"Company: {instance.company}\n"
                f"Service: {instance.service}\n"
                f"Message: {instance.message}\n"
                f"Newsletter: {instance.newsletter}\n\n"
                f"Submitted at: {instance.submitted_at}"
            )
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[destination_email],
                fail_silently=False,
            )
        except Exception as e:
            # Log to console in dev; in production use proper logging
            print(f"Failed to send email: {e}")


class ServiceProcessStepViewSet(viewsets.ModelViewSet):
    queryset = ServiceProcessStep.objects.all()
    serializer_class = ServiceProcessStepSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["step_number"]


class WhyChooseItemViewSet(viewsets.ModelViewSet):
    queryset = WhyChooseItem.objects.all()
    serializer_class = WhyChooseItemSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class OfficeHourViewSet(viewsets.ModelViewSet):
    queryset = OfficeHour.objects.all()
    serializer_class = OfficeHourSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class QuickStatViewSet(viewsets.ModelViewSet):
    queryset = QuickStat.objects.all()
    serializer_class = QuickStatSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class LeadershipViewSet(viewsets.ModelViewSet):
    queryset = Leadership.objects.all()
    serializer_class = LeadershipSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order"]


class TimelineEventViewSet(viewsets.ModelViewSet):
    queryset = TimelineEvent.objects.all()
    serializer_class = TimelineEventSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filterset_fields = ["is_active"]
    ordering_fields = ["order", "year"]