import { Component } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  registrationSuccess: boolean = false; // To track registration status

  constructor(private registerService: RegisterService) { }

  onRegister() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.registerService.register(userData).subscribe(
      data => {
        console.log('Registration successful', data);
        this.registrationSuccess = true; // Update on successful registration
        // Additional actions on success (e.g., redirect or display message)
      },
      error => {
        console.error('Registration failed', error);
        this.registrationSuccess = false; // Update on failed registration
        // Additional actions on failure (e.g., display error message)
      }
    );
  }
}
