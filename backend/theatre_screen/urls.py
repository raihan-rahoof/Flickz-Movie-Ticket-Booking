from django.urls import path
from .views import ScreenListCreateView,ScreenRetrieveUpdateView

urlpatterns = [
    path("add-screen/", ScreenListCreateView.as_view(), name="add-screen"),
    path(
        "update-screen/<int:pk>/",
        ScreenRetrieveUpdateView.as_view(),
        name="screen-detail",
    ),





]
