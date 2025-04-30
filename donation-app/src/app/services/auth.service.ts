import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Role } from '../shared/enums/roles.enum';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })

export class AuthService extends  BaseService{
  private currentUser: User | null = null;
  
  constructor(http: HttpClient, private router: Router) {
    super(http, `${environment.apiUrl}/users/verifysession`);
  } 
  
  logout() {
    this.currentUser = null;
    localStorage.removeItem('authToken');

  }

  getUser(): User | null {
    return this.currentUser;
  }

  hasRole(role: Role): boolean {
    return this.currentUser?.roleId === role;
  }

  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }
  
    
  CheckSession(authToken2:string){
    const authToken = this.getToken();  // Your function to retrieve token

    const headers = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };
    
    return this.http.post(this.apiUrl, authToken2, headers);
 
  }
}
