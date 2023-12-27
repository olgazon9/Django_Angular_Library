from django.urls import path
from .views import (
    LateLoanListView,
    LoanCreateView,
    LoanDetailView,
    LoanListView,
    LoanerCreateView,
    LoanerDeleteView,
    LoanerDetailView,
    LoanerListView,
    LoanerUpdateView,
    RegisterView, 
    LoginView, 
    BookCreateView, 
    BookDetailView, 
    BookUpdateView, 
    BookDeleteView,
    BookListView,
    ReturnBookView, 
)

urlpatterns = [
    # User authentication URLs
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    # Book CRUD URLs
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/create/', BookCreateView.as_view(), name='book-create'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('books/<int:pk>/update/', BookUpdateView.as_view(), name='book-update'),
    path('books/<int:pk>/delete/', BookDeleteView.as_view(), name='book-delete'),
    # ... Loaners ...
    path('loaners/', LoanerListView.as_view(), name='loaner-list'),
    path('loaners/create/', LoanerCreateView.as_view(), name='loaner-create'),
    path('loaners/<int:pk>/', LoanerDetailView.as_view(), name='loaner-detail'),
    path('loaners/<int:pk>/update/', LoanerUpdateView.as_view(), name='loaner-update'),
    path('loaners/<int:pk>/delete/', LoanerDeleteView.as_view(), name='loaner-delete'),
    # ...Loans ...
    path('loans/', LoanListView.as_view(), name='loan-list'),
    path('loans/create/', LoanCreateView.as_view(), name='loan-create'),
    path('loans/<int:pk>/', LoanDetailView.as_view(), name='loan-detail'),
    path('loans/<int:pk>/return/', ReturnBookView.as_view(), name='return-book'),
    path('loans/late/', LateLoanListView.as_view(), name='late-loan-list'),


]
