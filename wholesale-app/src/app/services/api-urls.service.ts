import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  constructor(private httpClient: HttpClient) { }

  // User api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  createUser(user) {
    console.log('REQUEST');
    this.httpClient.post('http://localhost:3000/api/users', {
      name: user.name,
      surname: user.surname,
      password: user.password,
      email: user.email,
      companyName: user.companyName,
      regon: user.regon,
      krs: user.krs,
      type: user.type
    }, this.httpOptions).subscribe((data) => {
      console.log(data);
    });
  }

}
