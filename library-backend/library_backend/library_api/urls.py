from django.urls import path
from . import views

urlpatterns = [
    # Publishing House endpoints
    path('publishing-houses/', views.PublishingHouseListCreateView.as_view(), name='publishing-house-list-create'),
    path('publishing-houses/<int:pk>/', views.PublishingHouseDetailView.as_view(), name='publishing-house-detail'),
    
    # Book endpoints
    path('authors/<int:author_id>/books/', views.AuthorBooksListView.as_view(), name='author-books'),
    path('books/', views.BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', views.BookDetailView.as_view(), name='book-detail'),
    path('authors/', views.AuthorListCreateView.as_view(), name='author-list-create'),
    path('authors/<int:pk>/', views.AuthorDetailView.as_view(), name='author-detail')
]
