import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = 'http://127.0.0.1:8000/register/';

  constructor(private http: HttpClient) { }

  register(userData: any) {
    return this.http.post(this.registerUrl, userData);
  }
}
