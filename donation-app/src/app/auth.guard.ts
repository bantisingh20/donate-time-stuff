import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    //const authToken = this.authService.getToken();  
    const authToken = this.authService.getToken(); 
 
    this.authService.CheckSession(authToken as any).subscribe({
      next: (response) => {
        const token = (response as any).token; 
        
         
      },
      error: (err) => {
        console.error('Registration failed:', err);       
        this.router.navigate(['/login']);
        return false;
       
      }
    });
  
    return true;
  }
}
