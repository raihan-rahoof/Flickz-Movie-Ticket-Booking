from rest_framework.generics import ListAPIView , RetrieveAPIView
from adminside.models import Movie
from .serializers import MovieSerializer
# Create your views here.

class HomeMovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MovieDetailsView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    