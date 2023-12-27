import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginSuccess: boolean = false; // Property to track login success

  constructor(private loginService: LoginService) {}

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe(
      data => {
        console.log('Login successful');
        this.loginSuccess = true; // Set login success to true
        // Handle successful login here
      },
      error => {
        console.error('Login failed', error);
        this.loginSuccess = false; // Set login success to false on error
        // Handle login error here
      }
    );
  }
}
