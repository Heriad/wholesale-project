import { v4 as uuid } from 'uuid';

function User(name, surname, email, password, companyName, regon, krs, type) {
  this._id = uuid();
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.password = password;
  this.companyName = companyName;
  this.regon = regon;
  this.krs = krs;
  this.type = type;
}

// TODO hash password
export function createUser(name, surname, email, password, companyName, regon, krs, type) {
  return new User(name, surname, email, password, companyName, regon, krs, type);
}

export const userType = {
  ALL: 'all',
  CLIENT: 'client',
  EMPLOYEE: 'employee'
}
