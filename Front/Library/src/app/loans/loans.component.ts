import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loans.service';

interface Loan {
  id: number;
  book: number;
  loaner: number;
  loan_date: string;
  returned: boolean;
}

interface Book {
  id: number;
  title: string;
}

interface Loaner {
  id: number;
  name: string;
}

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  loans: Loan[] = [];
  lateLoans: Loan[] = [];
  books: Book[] = [];
  loaners: Loaner[] = [];
  newLoan = { book: '', loaner: '' };

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadLoaners();
    this.loadLoans();
    this.loadLateLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe(data => {
      this.loans = data;
    }, error => console.log(error));
  }

  loadLateLoans(): void {
    this.loanService.getLateLoans().subscribe(data => {
      this.lateLoans = data;
    }, error => console.log(error));
  }

  loadBooks(): void {
    this.loanService.getBooks().subscribe(data => {
      this.books = data;
    }, error => console.log(error));
  }

  loadLoaners(): void {
    this.loanService.getLoaners().subscribe(data => {
      this.loaners = data;
    }, error => console.log(error));
  }

  onSubmit(): void {
    this.loanService.createLoan(this.newLoan).subscribe(() => {
      this.loadLoans();
    }, error => console.log(error));
  }

  returnLoan(id: number): void {
    this.loanService.returnBook(id).subscribe(() => {
      const loanToUpdate = this.loans.find(loan => loan.id === id);
      if (loanToUpdate) {
        loanToUpdate.returned = true;
      }
    }, error => console.log(error));
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find(b => b.id === bookId);
    return book ? book.title : 'Unknown Book';
  }

  getLoanerName(loanerId: number): string {
    const loaner = this.loaners.find(l => l.id === loanerId);
    return loaner ? loaner.name : 'Unknown Loaner';
  }
}
