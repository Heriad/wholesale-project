import { UserRole } from './user-role.model';

export class Employee {
  name: string;
  surname: string;
  password: string;
  email: string;
  workType: WorkType;
  type: UserRole;
}

export class UpdatedEmployee {
  id: string;
  rev: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  workType: WorkType;
  type: UserRole;
}

export enum WorkType {
  FULLTIME = 'full-time',
  PARTTIME = 'part-time'
}

// Nieużywane
export const WorkTypeText = new Map<WorkType, string>([
  [WorkType.FULLTIME, 'Pełen etat'],
  [WorkType.PARTTIME, 'Część etatu']
]);
