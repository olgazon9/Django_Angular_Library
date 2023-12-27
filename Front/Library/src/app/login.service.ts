import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://127.0.0.1:8000/login/'; // Update with your backend URL
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(this.loginUrl, { username, password });
  }
}
