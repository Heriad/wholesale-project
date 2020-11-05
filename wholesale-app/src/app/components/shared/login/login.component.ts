import { Location } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/models/user-role.model';
import { ApiResponse } from 'src/app/models/response.model';
import { AuthService } from './../../../services/auth.service';
import { ApiUrlsService } from 'src/app/services/api-urls.service';
import { Language } from 'src/app/models/language.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selectedLanguage: Language;
  notifications;
  loginForm: FormGroup;
  returnUrl: string;
  isRememberSelected = false;
  loginErrors: Array<string> = [];
  emailMaxLength = 30;
  passwordMaxLength = 20;
  returnUrlKey = 'returnUrl';

  constructor(private router: Router, private fb: FormBuilder, private location: Location, private authService: AuthService,
              public api: ApiUrlsService, private route: ActivatedRoute) {
    if (sessionStorage.getItem('selectedLanguage')) {
      this.selectedLanguage = sessionStorage.getItem('selectedLanguage') as Language;
    } else {
      this.selectedLanguage = Language.PL;
    }
    this.changeLanguage();
  }

  changeLanguage() {
    sessionStorage.setItem('selectedLanguage', this.selectedLanguage);
    if (this.selectedLanguage === 'PL') {
      this.notifications = this.api.getNotificationsPL();
    } else if (this.selectedLanguage === 'ENG') {
      this.notifications = this.api.getNotificationsEn();
    }
    this.loginErrors = [];
  }

  changeRememberState(event) {
    if (event) {
      this.isRememberSelected = !this.isRememberSelected;
    }
  }

  goBack() {
    this.location.back();
  }

  login() {
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
            this.router.navigateByUrl(this.returnUrl);
            break;
          case UserRole.EMPLOYEE:
            this.router.navigate(['/employee']);
            break;
          case UserRole.ADMIN:
            this.router.navigate(['/administrator']);
            break;
        }
        return true;
      } else {
        return false;
      }
    }
  }, (err) => {
    this.loginForm.controls.userPassword.patchValue('');
    this.loginErrors.push(this.notifications.loginComponent.incorrectCredentials);
  });
    } else {
      if (this.loginForm.controls.userEmail.invalid && this.loginForm.controls.userEmail.value.length > 0) {
        this.loginErrors.push(this.notifications.loginComponent.wrongEmail);
      }
      if (this.loginForm.controls.userEmail.value.length === 0 || this.loginForm.controls.userPassword.value.length === 0) {
        this.loginErrors.push(this.notifications.loginComponent.requiredFields);
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrlKey] || '/';
    if (JSON.parse(localStorage.getItem('userEmail'))) {
      this.loginForm.controls.userEmail.setValue(JSON.parse(localStorage.getItem('userEmail')));
      this.isRememberSelected = true;
    }
  }

}
