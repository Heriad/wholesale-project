import bcrypt from 'bcrypt';
import { UserRole } from '../src/models/UserRoleModel';

export async function createAdmin() {
    const newAdmin = {
        email: 'administrator@wholesale.com',
        password: 'adminws',
        type: UserRole.ADMIN
    }
    const saltRounds = 10;
    newAdmin.password = await bcrypt.hash(newAdmin.password, saltRounds);
    return newAdmin;
}