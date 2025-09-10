from rest_framework import serializers
from .models import SiteSettings, NavItem, FooterLink, SEO, Hero, Page, PageSection, ContactSubmission, ServiceProcessStep, WhyChooseItem, OfficeHour, SocialLink, QuickStat, Partner, CoreValue, Leadership, TimelineEvent


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class NavItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavItem
        fields = "__all__"


class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = "__all__"


class SEOSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEO
        fields = "__all__"


class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = "__all__"


class PageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageSection
        fields = "__all__"


class PageSerializer(serializers.ModelSerializer):
    sections = PageSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = "__all__"


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = "__all__"


class ServiceProcessStepSerializer(serializers.ModelSerializer):
    activities_list = serializers.SerializerMethodField()

    class Meta:
        model = ServiceProcessStep
        fields = [
            'id','step_number','title','description','activities','activities_list','is_active','created_at','updated_at'
        ]

    def get_activities_list(self, obj):
        return [a.strip() for a in (obj.activities or '').split(',') if a.strip()]


class WhyChooseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseItem
        fields = '__all__'


class OfficeHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeHour
        fields = '__all__'


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'


class QuickStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickStat
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'


class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = '__all__'


class TimelineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = '__all__'