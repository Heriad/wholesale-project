import bcrypt from 'bcrypt';
import { userType } from '../src/models/userModel';

export async function createAdmin() {
    const newAdmin = {
        email: 'administrator@wholesale.com',
        password: 'adminws',
        type: userType.ADMIN
    }
    const saltRounds = 10;
    newAdmin.password = await bcrypt.hash(newAdmin.password, saltRounds);
    return newAdmin;
}