import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Role } from '../shared/enums/roles.enum';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'donor@example.com', password: '1234', role: Role.Donor },
    { id: '2', name: 'Bob', email: 'recipient@example.com', password: '1234', role: Role.Recipient }
  ];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
}
