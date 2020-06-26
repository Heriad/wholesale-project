import { v4 as uuid } from 'uuid';

function Employee(name, surname, email, password, workType) {
    this._id = uuid();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.workType = workType;
}

export function createEmployee(name, surname, email, password, workType) {
    return new Employee(name, surname, email, password, workType);
}