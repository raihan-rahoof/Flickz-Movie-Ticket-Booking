from django.urls import path
from .views import HomeMovieListView , MovieDetailsView


urlpatterns = [
    path('movies/',HomeMovieListView.as_view(),name='home-movie-list'),
    path('movie/<int:pk>/', MovieDetailsView.as_view(), name='movie-detail'),
 
] 