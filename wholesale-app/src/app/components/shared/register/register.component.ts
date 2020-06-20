import { ApiUrlsService } from './../../../services/api-urls.service';
import { Component, OnInit } from '@angular/core';
import { User, UserRole } from 'src/app/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, public api: ApiUrlsService) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    email: ['', Validators.required],
    companyName: [''],
    regon: [''],
    krs: [''],
    type: [''],
  });

  registerUser() {
    if (this.registerForm.controls.password.value !== this.registerForm.controls.repeatPassword.value) {
      console.log('różne hasła!');
      return;
    }
    const user: User = {
      name: this.registerForm.controls.name.value,
      surname: this.registerForm.controls.surname.value,
      password: this.registerForm.controls.password.value,
      email: this.registerForm.controls.email.value,
      companyName: this.registerForm.controls.companyName.value,
      regon: this.registerForm.controls.regon.value,
      krs: this.registerForm.controls.krs.value,
      type: UserRole.CLIENT,
    };
    this.api.createUser(user).subscribe((res) => {
      console.log('res: ', res);
    });
  }

  ngOnInit(): void {
  }

}
