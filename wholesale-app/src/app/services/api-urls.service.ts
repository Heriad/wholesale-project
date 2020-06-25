import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // Employees api

}
