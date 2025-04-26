import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Role } from '../shared/enums/roles.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;

  // Simulated login with fake data
  login(email: string, password: string): boolean {
    const dummyUsers: User[] = [
      { id: '1', name: 'Alice', email: 'donor@example.com', password: '1234', role: Role.Donor },
      { id: '2', name: 'Bob', email: 'recipient@example.com', password: '1234', role: Role.Recipient },
      { id: '3', name: 'Admin', email: 'admin@example.com', password: 'admin', role: Role.Admin }
    ];

    const found = dummyUsers.find(u => u.email === email && u.password === password);
    if (found) {
      this.currentUser = found;
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  hasRole(role: Role): boolean {
    return this.currentUser?.role === role;
  }
}
