import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://127.0.0.1:8000/loans/';

  constructor(private http: HttpClient) { }

  getLoans(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getBooks(): Observable<any> {
    // Adjust this URL as per your API endpoint for books
    return this.http.get('http://127.0.0.1:8000/books/');
  }

  getLoaners(): Observable<any> {
    // Adjust this URL as per your API endpoint for loaners
    return this.http.get('http://127.0.0.1:8000/loaners/');
  }

  createLoan(loan: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}create/`, loan);
  }

  returnBook(loanId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}${loanId}/return/`, {});
  }
}
