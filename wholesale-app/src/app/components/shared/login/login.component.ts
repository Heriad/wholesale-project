import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  wrongCredentials = false;
  // usunac to i zrobić auth
  username: string;
  password: string;

  constructor(private router: Router, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    if (this.loginForm.controls.username.invalid || this.loginForm.controls.password.invalid) {
      this.wrongCredentials = true;
      console.log('Niepoprawne!');
    } else {
      this.wrongCredentials = false;
      console.log('Poprawne!');
      console.log('User: ', this.username);
      // TODO
      if (this.loginForm.controls.username.value === 'administrator' && this.loginForm.controls.password.value === 'admin') {
        console.log('test');
        this.router.navigate(['/administrator']).then((nav) => {
            console.log(nav);
          }, err => {
            console.log(err);
        });
      }
    }
  }

  ngOnInit(): void {
  }

}
