import { UserRole } from './user-role.model';

export class Employee {
  name: string;
  surname: string;
  password: string;
  email: string;
  workType: WorkType;
  role: UserRole;
}

export class UpdatedEmployee {
  id: string;
  rev: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  workType: WorkType;
  role: UserRole;
}

export enum WorkType {
  FULLTIME = 'full-time',
  PARTTIME = 'part-time'
}
