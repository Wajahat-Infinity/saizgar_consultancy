from django.contrib import admin
from .models import SiteSettings, NavItem, FooterLink, SEO, Hero, Page, PageSection, ContactSubmission, ServiceProcessStep, WhyChooseItem, OfficeHour, SocialLink, QuickStat, Partner, CoreValue, Leadership, TimelineEvent


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "contact_email", "contact_phone", "enable_dark_mode", "show_search")


@admin.register(NavItem)
class NavItemAdmin(admin.ModelAdmin):
    list_display = ("label", "href", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("label", "href")


@admin.register(FooterLink)
class FooterLinkAdmin(admin.ModelAdmin):
    list_display = ("group", "label", "href", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("group",)
    search_fields = ("label", "href")


@admin.register(SEO)
class SEOAdmin(admin.ModelAdmin):
    list_display = ("page_title",)
    search_fields = ("page_title", "meta_description", "keywords")


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ("title", "cta_label", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title", "subtitle")


class PageSectionInline(admin.TabularInline):
    model = PageSection
    extra = 1


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("slug", "title", "is_active")
    list_filter = ("is_active",)
    search_fields = ("slug", "title")
    inlines = [PageSectionInline]


@admin.register(PageSection)
class PageSectionAdmin(admin.ModelAdmin):
    list_display = ("page", "identifier", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("page", "is_active")
    search_fields = ("identifier", "heading", "content")


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "service", "created_at")
    search_fields = ("name", "email", "message", "company", "service")


@admin.register(ServiceProcessStep)
class ServiceProcessStepAdmin(admin.ModelAdmin):
    list_display = ("step_number", "title", "is_active")
    list_editable = ("is_active",)
    ordering = ("step_number",)
    search_fields = ("title", "description", "activities")


@admin.register(WhyChooseItem)
class WhyChooseItemAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)
    search_fields = ("title", "description")


@admin.register(OfficeHour)
class OfficeHourAdmin(admin.ModelAdmin):
    list_display = ("day", "hours", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("name", "url", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)


@admin.register(QuickStat)
class QuickStatAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)


@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)
    search_fields = ("title", "description")


@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)
    search_fields = ("name", "position", "specialization")
    list_filter = ("is_active",)


@admin.register(TimelineEvent)
class TimelineEventAdmin(admin.ModelAdmin):
    list_display = ("year", "title", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order", "year")
    search_fields = ("title", "description")
    list_filter = ("is_active", "year")

# Register your models here.
