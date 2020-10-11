import { UserRole } from 'src/app/models/user-role.model';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isRememberSelected = false;
  loginErrors: Array<string> = [];

  constructor(private router: Router, private fb: FormBuilder, private location: Location, private authService: AuthService,
              public api: ApiUrlsService) { }

  loginForm = this.fb.group({
    userEmail: ['', [Validators.required, Validators.email]],
    userPassword: ['', Validators.required]
  });

  changeRememberState(event) {
    if (event) {
      this.isRememberSelected = !this.isRememberSelected;
    }
  }

  goBack() {
    this.location.back();
  }

  login() {
    // NOWE LOGOWANIE
    this.loginErrors = [];
    if (this.loginForm.valid) {
      this.authService.authenticateUser(this.loginForm.controls.userEmail.value, this.loginForm.controls.userPassword.value)
      .then((response: ApiResponse) => {
    if (response.success) {

      if (this.isRememberSelected) {
        localStorage.setItem('userEmail', JSON.stringify(this.loginForm.controls.userEmail.value));
      } else if (JSON.parse(localStorage.getItem('userEmail'))) {
        localStorage.removeItem('userEmail');
      }

      this.authService.setUserData(response.data);
      this.api.login(response.data);

      if (this.api.user) {
        switch (this.api.user.type) {
          case UserRole.CLIENT:
            this.router.navigate(['/']);
            break;
          case UserRole.EMPLOYEE:
            this.router.navigate(['/employee']);
            break;
          case UserRole.ADMIN:
            this.router.navigate(['/administrator']);
            break;
        }
        return false;
      } else {
        return false;
      }

    }
  }, (err) => {
    this.loginErrors.push('Połączenie nazwy użytkownika i hasła jest nieprawidłowe');
  });
    } else {
      if (this.loginForm.controls.userEmail.invalid && this.loginForm.controls.userEmail.value.length > 0) {
        this.loginErrors.push('Wprowadź popawny adres e-mail');
      }
      if (this.loginForm.controls.userEmail.value.length === 0 || this.loginForm.controls.userPassword.value.length === 0) {
        this.loginErrors.push('Uzupełnij wymagane pola');
      }
    }


    // todo wywalic jak nieptozrebne
    // STARE LOGOWANIE BEZ UWIERZYTELNIANIA
    // if (this.loginForm.controls.email.invalid || this.loginForm.controls.password.invalid) {
    //   this.wrongCredentials = true;
    //   console.log('Niepoprawne!');
    // } else {
    //   this.wrongCredentials = false;
    //   console.log('Poprawne!');
    //   console.log('User: ', this.email);
    //   // TODO
    //   if (this.loginForm.controls.email.value === 'administrator' && this.loginForm.controls.password.value === 'admin4322') {
    //     console.log('test: ', this.isRememberSelected);
    //     // Jeżeli checkbox jest zaznaczony, zapamiętaj nazwę użytkownika/Email
    //     if (this.isRememberSelected) {
    //       localStorage.setItem('userEmail', JSON.stringify(this.loginForm.controls.email.value));
    //     } else {
    //       localStorage.removeItem('userEmail');
    //     }
    //     this.router.navigate(['/administrator']).then((nav) => {
    //         console.log(nav);
    //       }, err => {
    //         console.log(err);
    //     });
    //   }
    // }
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('userEmail'))) {
      this.loginForm.controls.userEmail.setValue(JSON.parse(localStorage.getItem('userEmail')));
      this.isRememberSelected = true;
    }
  }

}
