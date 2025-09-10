from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsViewSet,
    NavItemViewSet,
    FooterLinkViewSet,
    SEOViewSet,
    HeroViewSet,
    PageViewSet,
    PageSectionViewSet,
    ContactSubmissionViewSet,
    ServiceProcessStepViewSet,
    WhyChooseItemViewSet,
    OfficeHourViewSet,
    SocialLinkViewSet,
    QuickStatViewSet,
    PartnerViewSet,
    CoreValueViewSet,
    LeadershipViewSet,
    TimelineEventViewSet,
)

router = DefaultRouter()
router.register(r'settings', SiteSettingsViewSet, basename='sitesettings')
router.register(r'nav-items', NavItemViewSet)
router.register(r'footer-links', FooterLinkViewSet)
router.register(r'seo', SEOViewSet)
router.register(r'hero', HeroViewSet)
router.register(r'pages', PageViewSet)
router.register(r'sections', PageSectionViewSet)
router.register(r'contact-submissions', ContactSubmissionViewSet)
router.register(r'process-steps', ServiceProcessStepViewSet)
router.register(r'why-choose', WhyChooseItemViewSet)
router.register(r'office-hours', OfficeHourViewSet)
router.register(r'social-links', SocialLinkViewSet)
router.register(r'quick-stats', QuickStatViewSet)
router.register(r'partners', PartnerViewSet)
router.register(r'core-values', CoreValueViewSet)
router.register(r'leadership', LeadershipViewSet)
router.register(r'timeline-events', TimelineEventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


