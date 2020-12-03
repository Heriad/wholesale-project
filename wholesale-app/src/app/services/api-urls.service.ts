import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Client } from '../models/client.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product, UpdatedProduct } from '../models/product.model';
import { Employee, UpdatedEmployee } from '../models/employee.model';
import notificationsPl from '../../assets/dictionary/notifications-pl.json';
import notificationsEn from '../../assets/dictionary/notifications-en.json';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  user;
  countries = [];
  notificationsPl = notificationsPl;
  notificationsEn = notificationsEn;

  constructor(private httpClient: HttpClient) {
    this.getAssets();
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  // Asset api

   getAssets() {
    this.getAsset('assets/dictionary/countries.json', this.countries);
  }

  getAsset(path: string, variable) {
    this.httpClient.get(path).subscribe(data => {
      Object.assign(variable, data);
    });
  }

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

  updateEmployee(updatedEmployee: UpdatedEmployee) {
    return this.httpClient.put(environment.baseUrl + '/api/employees', {
      id: updatedEmployee.id,
      rev: updatedEmployee.rev,
      name: updatedEmployee.name,
      surname: updatedEmployee.surname,
      password: updatedEmployee.password,
      email: updatedEmployee.email,
      workType: updatedEmployee.workType,
      type: updatedEmployee.type
    });
  }

  removeEmployee(id: string) {
    return this.httpClient.delete(environment.baseUrl + '/api/employees/' + id);
  }

  // Product api

  createProduct(product: Product) {
    return this.httpClient.post(environment.baseUrl + '/api/products', product);
  }

  getProduct(id: string) {
    return this.httpClient.get(environment.baseUrl + '/api/products/' + id);
  }

  getProducts() {
    return this.httpClient.get(environment.baseUrl + '/api/products');
  }

  updateProduct(updatedProduct: UpdatedProduct) {
    return this.httpClient.put(environment.baseUrl + '/api/products', updatedProduct);
  }

  removeProduct(id: string) {
    return this.httpClient.delete(environment.baseUrl + '/api/products/' + id);
  }

  // Order api

  createOrder(order: Order) {
    return this.httpClient.post(environment.baseUrl + '/api/orders', order);
  }

  // Countries api

  getCountries() {
    return this.countries;
  }

  getNotificationsPL() {
    return this.notificationsPl;
  }

  getNotificationsEn() {
    return this.notificationsEn;
  }

  // Login api

  login(user) {
    this.user = user;
    return new Observable<boolean>(observer => {
      observer.next(true);
    });
  }

  // Logout api

  logout() {
    this.user = null;
    localStorage.removeItem('userData');
    return new Observable<boolean>(observer => {
      observer.next(true);
    });
  }

}
