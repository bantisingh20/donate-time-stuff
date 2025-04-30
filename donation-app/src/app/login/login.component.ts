import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
   
  error = '';
  constructor(private fb: FormBuilder, private userService:UserService,private authService: AuthService, private router: Router) {
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
      
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          const token = (response as any).token; 
          if (token) {
            this.authService.storeToken(token);
            this.router.navigate(['/dashboard']); // or wherever you want
          }
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Registration failed. Please try again.');
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
