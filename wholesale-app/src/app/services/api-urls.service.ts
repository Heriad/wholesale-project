import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  constructor(private httpClient: HttpClient) { }

  // User api

  createUser(user) {
    return this.httpClient.post(environment.baseUrl + '/api/users', {
      name: user.name,
      surname: user.surname,
      password: user.password,
      email: user.email,
      companyName: user.companyName,
      regon: user.regon,
      krs: user.krs,
      type: user.type
    });
  }

}
