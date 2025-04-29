import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Role } from '../shared/enums/roles.enum';
import { environment } from '../../environment/environment'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl: string;
  constructor(private http: HttpClient,private router: Router) {
    const currentPath = this.router.url.replace('/', '');  
    this.apiUrl =`${environment.apiUrl}/users/${currentPath}`;
    console.log('API URL:', this.apiUrl);

  }
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  registerUser(user :any): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  
  addUser(user: User) {   
    return this.http.post<User>(this.apiUrl, user);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
}
