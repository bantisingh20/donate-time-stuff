import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Role } from '../shared/enums/roles.enum';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })

export class AuthService extends  BaseService<User>{
  private currentUser: User | null = null;
//  private apiUrl: string;

  constructor(http: HttpClient, private router: Router) {
    super(http, `${environment.apiUrl}/users`);
  }

  // constructor(private http: HttpClient,private router: Router) {
  //   const currentPath = this.router.url.replace('/', '');  
  //   this.apiUrl =`${environment.apiUrl}/users/${currentPath}`;
  //   console.log('API URL:', this.apiUrl);
  // }
 
  login(email: string, password: string): Observable<boolean> {
    const payload = { email, password };
    return this.http.post<User>(`${this.apiUrl}/login`, payload, { headers: this.headers }).pipe(
      map(user => {
        this.currentUser = user;
        localStorage.setItem('token', "0");  
        return true;
      }),
      catchError(err => {
        return of(false);
      })
    );
  } 

  logout() {
    this.currentUser = null;
    localStorage.removeItem('token');
  }

  getUser(): User | null {
    return this.currentUser;
  }

  hasRole(role: Role): boolean {
    return this.currentUser?.roleId === role;
  }
}
