import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Loaner {
  id?: number;
  name: string;
  age: number | null;  // Allow null as well
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanerService {
  private apiBaseUrl = 'http://localhost:8000'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getLoaners(): Observable<Loaner[]> {
    return this.http.get<Loaner[]>(`${this.apiBaseUrl}/loaners/`);
  }

  createLoaner(loaner: Loaner): Observable<Loaner> {
    return this.http.post<Loaner>(`${this.apiBaseUrl}/loaners/create/`, loaner);
  }

  updateLoaner(id: number, loaner: Loaner): Observable<Loaner> {
    return this.http.put<Loaner>(`${this.apiBaseUrl}/loaners/${id}/update/`, loaner);
  }

  deleteLoaner(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/loaners/${id}/delete/`);
  }
}
