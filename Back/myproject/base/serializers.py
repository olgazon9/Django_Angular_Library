from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Book, Loan, Loaner

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ['id', 'book', 'loaner', 'loan_date', 'returned', 'return_date']

class LoanerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loaner
        fields = ['id', 'name', 'age', 'email']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'year_published']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
