# myproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include app URLs
    path('', include('base.urls')),  # Replace 'appname' with your app's name
    # You can include URLs from other apps in a similar way
    # path('anotherapp/', include('anotherapp.urls')),
]
