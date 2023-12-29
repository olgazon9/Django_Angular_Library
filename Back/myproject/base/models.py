from django.db import models
from datetime import timedelta, date

class Loan(models.Model):
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    loaner = models.ForeignKey('Loaner', on_delete=models.CASCADE)
    loan_date = models.DateField(auto_now_add=True)
    returned = models.BooleanField(default=False)
    return_date = models.DateField(null=True, blank=True)

    @property
    def is_late(self):
        return not self.returned and date.today() > self.loan_date + timedelta(days=1)

    def __str__(self):
        return f"{self.book.title} loaned to {self.loaner.name}"
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    year_published = models.IntegerField()

    def __str__(self):
        return self.title

class Loaner(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()

    def __str__(self):
        return self.name
    
    
