import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../shared/enums/roles.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
   
  error = '';
  constructor(private fb: FormBuilder,private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  
  navigateToSignup() {
    this.router.navigate(['/sign-up']);   
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            console.log('Login successful');
            alert('Login successful!');
            this.router.navigate(['/dashboard']);
          } else {
            console.warn('Login failed: Invalid credentials');
            alert('Invalid email or password.');
          }
        },
        error: (err) => {
          console.error('Login request error:', err);
          alert('Something went wrong. Please try again later.');
        }
      });     

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginold() {
    debugger;
    
  }
}
