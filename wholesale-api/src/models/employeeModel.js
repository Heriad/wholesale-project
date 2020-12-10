import { v4 as uuid } from 'uuid';

function Employee(name, surname, email, password, workType, role) {
  this._id = uuid();
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.password = password;
  this.workType = workType;
  this.role = role;
}

function UpdatedEmployee(id, rev, name, surname, email, password, workType, role) {
  this._id = id,
  this._rev = rev,
  this.name = name,
  this.surname = surname,
  this.email = email,
  this.password = password,
  this.workType = workType,
  this.role = role;
}

export function createEmployee(name, surname, email, password, workType, role) {
  return new Employee(name, surname, email, password, workType, role);
}

export function updateEmployeeData(id, rev, name, surname, email, password, workType, role) {
  return new UpdatedEmployee(id, rev, name, surname, email, password, workType, role);
}