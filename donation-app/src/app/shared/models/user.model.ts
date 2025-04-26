import { Role } from '../enums/roles.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
