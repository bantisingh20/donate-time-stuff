import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { Role } from '../shared/enums/roles.enum';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup', 
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      roleId: ['donor', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  get fullName() { return this.signupForm.get('fullName')!; }
  get email() { return this.signupForm.get('email')!; }
  get password() { return this.signupForm.get('password')!; }
  get confirmPassword() { return this.signupForm.get('confirmPassword')!; }
  get roleId() { return this.signupForm.get('roleId')!; }


  passwordsMatch(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
  
    const formData = this.signupForm.value;
  
    // const newUser: User = {
    //   id: Date.now().toString(),
    //   fullName: formData.fullName!,            
    //   email: formData.email!,
    //   password: formData.password!,
    //   roleId: "0"! as Role      
    // };
  
    this.userService.registerUser(formData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
  

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
