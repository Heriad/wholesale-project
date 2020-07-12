import { v4 as uuid } from 'uuid';

function Employee(name, surname, email, password, workType, type) {
    this._id = uuid();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.workType = workType;
    this.type = type;
}

function UpdatedEmployee(id, rev, name, surname, email, password, workType, type) {
    this._id = id,
    this._rev = rev,
    this.name = name,
    this.surname = surname,
    this.email = email,
    this.password = password,
    this.workType = workType,
    this.type = type;
}

export function createEmployee(name, surname, email, password, workType, type) {
    return new Employee(name, surname, email, password, workType, type);
}

export function updateEmployeeData(id, rev, name, surname, email, password, workType, type) {
    return new UpdatedEmployee(id, rev, name, surname, email, password, workType, type);
}