import { UserRole } from './user-role.model';

export class Client {
  name: string;
  surname: string;
  password: string;
  email: string;
  companyName?: string;
  regon?: string;
  krs?: string;
  role: UserRole;
}
