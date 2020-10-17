import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;

  constructor(private httpClient: HttpClient) { }

  setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.isLoggedIn = true;
  }

  isAuthenticated(): boolean {
    const userData = localStorage.getItem('userData');
    if (userData && JSON.parse(userData)) {
      console.log('user authenticated')
      return true;
    }
    return false;
  }

  authenticateUser(userEmail, userPassword) {
    return this.httpClient.post(environment.baseUrl + '/api/login', {
      email: userEmail,
      password: userPassword,
    }).toPromise();
  }

  logoutUser() {
    return this.httpClient.delete(environment.baseUrl + '/api/login');
  }

}
