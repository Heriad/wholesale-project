import { v4 as uuid } from 'uuid';

function Client(name, surname, email, password, companyName, regon, krs, role) {
  this._id = uuid();
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.password = password;
  this.companyName = companyName;
  this.regon = regon;
  this.krs = krs;
  this.role = role;
}

export function createClient(name, surname, email, password, companyName, regon, krs, role) {
  return new Client(name, surname, email, password, companyName, regon, krs, role);
}