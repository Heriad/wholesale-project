import { WorkType } from './employee.model';
import { UserRole } from './client.model';

export class ApiResponse {
  success: boolean;
  message: string;
  data: object;
}

export class GetEmployeesResponse {
  success: boolean;
  message: string;
  data: Array<{
    name: string;
    surname: string;
    password: string;
    email: string;
    type: UserRole;
    workType: WorkType
  }>;
}
