from django.contrib import admin
from django.urls import path
from .views import AdminTokenObtainPairView,UserListView,BlockUnblockUser,MovieListCreateAPIView

urlpatterns = [
    path('admin/token', AdminTokenObtainPairView.as_view(), name='admin_token_obtain_pair'),
    path('admin/user-list', UserListView.as_view(),name='userList'),
    path('admin/user-block-unblock/<int:id>/',BlockUnblockUser.as_view(),name='user-block-unblock'),

    path('admin/add-movies/',MovieListCreateAPIView.as_view(),name = 'movie-list-create'),
] 