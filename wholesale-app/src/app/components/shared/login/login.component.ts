import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  wrongCredentials = false;
  // usunac to i zrobić auth
  email: string;
  password: string;

  isRememberSelected = false;

  constructor(private router: Router, private fb: FormBuilder, private location: Location) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
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
    if (this.loginForm.controls.email.invalid || this.loginForm.controls.password.invalid) {
      this.wrongCredentials = true;
      console.log('Niepoprawne!');
    } else {
      this.wrongCredentials = false;
      console.log('Poprawne!');
      console.log('User: ', this.email);
      // TODO
      if (this.loginForm.controls.email.value === 'administrator' && this.loginForm.controls.password.value === 'admin4322') {
        console.log('test: ', this.isRememberSelected);
        // Jeżeli checkbox jest zaznaczony, zapamiętaj nazwę użytkownika/Email
        if (this.isRememberSelected) {
          localStorage.setItem('userEmail', JSON.stringify(this.loginForm.controls.email.value));
        } else {
          localStorage.removeItem('userEmail');
        }
        this.router.navigate(['/administrator']).then((nav) => {
            console.log(nav);
          }, err => {
            console.log(err);
        });
      }
    }
  }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('userEmail'));
    if (this.email) {
      this.loginForm.controls.email.setValue(this.email);
      this.isRememberSelected = true;
    }
  }

}
