export class Employee {
  name: string;
  surname: string;
  password: string;
  email: string;
  workType: WorkType;
  type: UserRole;
}

export enum UserRole {
  ALL = 'all',
  CLIENT = 'client',
  EMPLOYEE = 'employee'
}

export enum WorkType {
  FULLTIME = 'full-time',
  PARTTIME = 'part-time'
}
