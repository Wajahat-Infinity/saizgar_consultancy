"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.conf import settings
from django.conf.urls.static import static

def api_root(request):
    return JsonResponse({
        'message': 'Saizgar Engineering Consultancy API',
        'version': '1.0.0',
        'docs': '/api/docs/',
        'admin': '/admin/',
        'endpoints': {
            'settings': '/api/settings/',
            'services': '/api/services/',
            'projects': '/api/projects/',
            'sectors': '/api/sectors/',
            'team': '/api/team/',
            'testimonials': '/api/testimonials/',
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    # API schema and docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
    # App URLs (to be added by each app)
    path('api/', include('cms.urls')),
    path('api/', include('services.urls')),
    path('api/', include('projects.urls')),
    path('api/', include('sectors.urls')),
    path('api/', include('team.urls')),
    path('api/', include('testimonials.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
