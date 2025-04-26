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
      console.log('Login Form Values:', email, password);

      const success = this.auth.login(email, password);
      if (!success) {
        this.error = 'Invalid email or password';
        return;
      }

      const role = this.auth.getUser()?.role;

      // Redirect based on role
      if (role === Role.Donor) {
        this.router.navigate(['/dashboard']);
      } else if (role === Role.Recipient) {
        this.router.navigate(['/recipient/requests']);
      } else if (role === Role.Admin) {
        this.router.navigate(['/admin']);
      }

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginold() {
    debugger;
    
  }
}
