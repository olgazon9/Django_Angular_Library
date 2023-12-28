import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://127.0.0.1:8000/login/'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      tap(response => {
        // Assuming the token is returned in the response under the key 'token'
        sessionStorage.setItem('token', response.token);
      })
    );
  }
}
