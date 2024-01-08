import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Loaner {
  id?: number;
  name: string;
  age: number | null; // Allow null as well
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanerService {
  // Using hardcoded URL for loaners
  private loanersUrl = 'http://127.0.0.1:8000/loaners/';

  constructor(private http: HttpClient) {}

  getLoaners(): Observable<Loaner[]> {
    return this.http.get<Loaner[]>(this.loanersUrl);
  }

  createLoaner(loaner: Loaner): Observable<Loaner> {
    return this.http.post<Loaner>(`${this.loanersUrl}create/`, loaner);
  }

  updateLoaner(id: number, loaner: Loaner): Observable<Loaner> {
    return this.http.put<Loaner>(`${this.loanersUrl}${id}/update/`, loaner);
  }

  deleteLoaner(id: number): Observable<any> {
    return this.http.delete(`${this.loanersUrl}${id}/delete/`);
  }
}
