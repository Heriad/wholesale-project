import { WorkType } from './employee.model';
import { UserRole } from './user-role.model';

export class ApiResponse {
  success: boolean;
  message: string;
  data: object;
}

export class GetEmployeesResponse {
  success: boolean;
  message: string;
  data: Array<{
    _id: string;
    _rev: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    type: UserRole;
    workType: WorkType
  }>;
}

export class GetProductsResponse {
  success: boolean;
  message: string;
  data: Array<{
    _id: string;
    _rev: string;
    name: string;
    description: string;
    image: File;
    price: number;
    producer: string;
    timestamp: number;
  }>;
}
