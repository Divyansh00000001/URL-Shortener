from django.urls import path
from .views import (
    CreateShortURL,
    AnalyticsView,
    redirect_url
)

urlpatterns = [

    path(
        "api/shorten/",
        CreateShortURL.as_view()
    ),

    path(
        "api/stats/<str:code>/",
        AnalyticsView.as_view()
    ),

    path(
        "<str:code>/",
        redirect_url
    ),
]