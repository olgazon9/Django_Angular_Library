from datetime import date, timedelta
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status, generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Book, Loan, Loaner
from .serializers import LoanSerializer, LoanerSerializer, UserSerializer, BookSerializer
from .serializers import serializers


class DeleteLoanView(APIView):
    def delete(self, request, pk):
        loan = get_object_or_404(Loan, pk=pk)
        loan.delete()
        return JsonResponse({'message': 'Loan deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
class LateLoanListView(generics.ListAPIView):
    serializer_class = LoanSerializer

    def get_queryset(self):
        return Loan.objects.filter(loan_date__lte=date.today() - timedelta(days=1), returned=False)


class ReturnBookView(APIView):
    def post(self, request, pk):
        loan = get_object_or_404(Loan, pk=pk)
        if not loan.returned:
            loan.returned = True
            loan.return_date = date.today()
            loan.save()
            return Response({'status': 'Book returned'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Book already returned'}, status=status.HTTP_400_BAD_REQUEST)

class LoanListView(generics.ListAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanCreateView(generics.CreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    def perform_create(self, serializer):
        if Loan.objects.filter(book=serializer.validated_data['book'], returned=False).exists():
            raise serializers.ValidationError('This book is currently on loan.')
        serializer.save()

class LoanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanerListView(generics.ListAPIView):
    queryset = Loaner.objects.all()
    serializer_class = LoanerSerializer

class LoanerCreateView(generics.CreateAPIView):
    queryset = Loaner.objects.all()
    serializer_class = LoanerSerializer

class LoanerDetailView(generics.RetrieveAPIView):
    queryset = Loaner.objects.all()
    serializer_class = LoanerSerializer

class LoanerUpdateView(generics.UpdateAPIView):
    queryset = Loaner.objects.all()
    serializer_class = LoanerSerializer

class LoanerDeleteView(generics.DestroyAPIView):
    queryset = Loaner.objects.all()
    serializer_class = LoanerSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookCreateView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookUpdateView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

class BookDeleteView(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]
