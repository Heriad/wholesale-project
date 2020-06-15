var uuid = require('uuid/v4')

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
module.exports.createUser = function(name, surname, email, password, companyName, regon, krs, type) {
  return new User(name, surname, email, password, companyName, regon, krs, type);
}