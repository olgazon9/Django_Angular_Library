import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Book {
  id?: number;
  title: string;
  author: string;
  genre: string;
  year_published: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiBaseUrl = 'http://localhost:8000'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in session storage.');
      return new HttpHeaders();
    }

    // Assuming the backend expects a 'Bearer' token. Adjust if necessary.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Changed from 'Token' to 'Bearer'
    });

    return headers;
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiBaseUrl}/books/`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiBaseUrl}/books/${id}/`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiBaseUrl}/books/create/`, book, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiBaseUrl}/books/${id}/update/`, book, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/books/${id}/delete/`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
