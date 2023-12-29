import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://127.0.0.1:8000/loans/';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in session storage.');
      return new HttpHeaders();
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  getLoans(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() });
  }

  getLateLoans(): Observable<any> {
    return this.http.get(`${this.baseUrl}late/`, { headers: this.getHeaders() });
  }

  getBooks(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/books/', { headers: this.getHeaders() });
  }

  getLoaners(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/loaners/', { headers: this.getHeaders() });
  }

  createLoan(loan: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}create/`, loan, { headers: this.getHeaders() });
  }

  returnBook(loanId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}${loanId}/return/`, {}, { headers: this.getHeaders() });
  }
}
