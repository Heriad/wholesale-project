import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Employee, UpdatedEmployee } from '../models/employee.model';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  constructor(private httpClient: HttpClient) { }

  // Client api

  createClient(client: Client) {
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

  createEmployee(employee: Employee) {
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

  updateEmployee(employee: UpdatedEmployee) {
    return this.httpClient.put(environment.baseUrl + '/api/employees', {
      id: employee.id,
      rev: employee.rev,
      name: employee.name,
      surname: employee.surname,
      password: employee.password,
      email: employee.email,
      workType: employee.workType,
      type: employee.type
    });
  }

  removeEmployee(id: string) {
    return this.httpClient.delete(environment.baseUrl + '/api/employees/' + id);
  }

  // Product api

  createProduct(product: Product) {
    return this.httpClient.post(environment.baseUrl + '/api/products', {
      name: product.name,
      description: product.description,
      image: {
        lastModified: product.image.lastModified,
        name: product.image.name,
        size: product.image.size,
        type: product.image.type
      },
      price: product.price,
      producer: product.producer,
      createdDate: product.createdDate
    });
  }

  // getOne
  getProducts() {
    return this.httpClient.get(environment.baseUrl + '/api/products');
  }

  removeProduct(id: string) {
    return this.httpClient.delete(environment.baseUrl + '/api/products/' + id);
  }


}
