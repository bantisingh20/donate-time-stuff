import { Role } from '../enums/roles.enum';

export interface User {
  token(arg0: string, token: any): unknown;
  id: string;
  fullName: string;
  email: string;
  password: string;
  roleId: Role;
}
