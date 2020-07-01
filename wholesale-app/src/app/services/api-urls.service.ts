import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  constructor(private httpClient: HttpClient) { }

  // Client api

  createClient(client) {
    return this.httpClient.post(environment.baseUrl + '/api/clients', {
      name: client.name,
      surname: client.surname,
      password: client.password,
      email: client.email,
      companyName: client.companyName,
      regon: client.regon,
      krs: client.krs,
      type: client.type
    });
  }

  getClients() {
    return this.httpClient.get(environment.baseUrl + '/api/clients');
  }

  // Employee api

  createEmployee(employee) {
    console.log('createEm: ', employee);
    return this.httpClient.post(environment.baseUrl + '/api/employees', {
      name: employee.name,
      surname: employee.surname,
      password: employee.password,
      email: employee.email,
      workType: employee.workType,
      type: employee.type
    });
  }

  getEmployees() {
    return this.httpClient.get(environment.baseUrl + '/api/employees');
  }

  removeEmployee(id) {
    return this.httpClient.delete(environment.baseUrl + '/api/employees/' + id);
  }

}
