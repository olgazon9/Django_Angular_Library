import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class BooksService {
  // Using hardcoded URL for fetching books
  private booksUrl = 'http://127.0.0.1:8000/books/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Adjust if you're storing the token elsewhere
    if (!token) {
      console.error('No token found in session storage.');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getBooks(): Observable<any> {
    return this.http.get(this.booksUrl, { headers: this.getHeaders() });
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}${id}/`, { headers: this.getHeaders() });
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.booksUrl}create/`, book, { headers: this.getHeaders() });
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.booksUrl}${id}/update/`, book, { headers: this.getHeaders() });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.booksUrl}${id}/delete/`, { headers: this.getHeaders() });
  }
}
