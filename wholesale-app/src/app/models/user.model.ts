export enum UserRole {
  ALL = 'all',
  CLIENT = 'client',
  EMPLOYEE = 'employee'
}

export class User {
  name: string;
  surname: string;
  password: string;
  email: string;
  companyName?: string;
  regon?: string;
  krs?: string;
  type: UserRole;
}
