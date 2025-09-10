from rest_framework import serializers
from .models import Project, ProjectImage, ProjectCategory, Award


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = "__all__"


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = "__all__"


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    category = ProjectCategorySerializer(read_only=True)
    awards = AwardSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


