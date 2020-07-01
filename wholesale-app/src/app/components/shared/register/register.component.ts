import { ApiUrlsService } from './../../../services/api-urls.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiResponse } from 'src/app/models/response.model';
import { UserRole } from 'src/app/models/user-role.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, public api: ApiUrlsService) { }

  registerForm: FormGroup;
  registerError: Array<string> = [];
  isUserCreated: boolean;

  registerUser() {
    this.registerError = [];
    if (this.registerForm.controls.name.invalid || this.registerForm.controls.surname.invalid ||
        this.registerForm.controls.password.invalid || this.registerForm.controls.repeatPassword.invalid ||
        this.registerForm.controls.email.value.length === 0) {
      this.registerError.push('Uzupełnij wymagane pola');
    }
    if (this.registerForm.controls.email.value.length > 0 && this.registerForm.controls.email.invalid) {
      this.registerError.push('Wprowadź poprawny adres email');
    }
    if ((this.registerForm.controls.password.value.length && this.registerForm.controls.repeatPassword.value.length) < 8 &&
          (this.registerForm.controls.password.value.length || this.registerForm.controls.repeatPassword.value.length) > 0) {
      this.registerError.push('Hasło musi posiadać minimum 8 znaków');
    }
    if ((this.registerForm.controls.password.value !== this.registerForm.controls.repeatPassword.value) &&
        (this.registerForm.controls.password.value.length > 0 && this.registerForm.controls.repeatPassword.value.length)) {
      this.registerError.push('Hasła nie są jednakowe');
    }
    const client: Client = {
      name: this.registerForm.controls.name.value,
      surname: this.registerForm.controls.surname.value,
      password: this.registerForm.controls.password.value,
      email: this.registerForm.controls.email.value,
      companyName: this.registerForm.controls.companyName.value,
      regon: this.registerForm.controls.regon.value,
      krs: this.registerForm.controls.krs.value,
      type: UserRole.CLIENT,
    };
    if (this.registerForm.valid && this.registerError.length === 0) {
      this.api.createClient(client).subscribe((res: ApiResponse) => {
        console.log('res: ', res); // TODO usunac
        if (res.success) {
          this.isUserCreated = true;
        }
      }, (err) => {
        console.log(err);
        if (!err.error.success && err.error.message === `Client ${this.registerForm.controls.email.value} already exists`) {
          this.registerError.push('Użytkownik o danym adresie email już istnieje');
        }
      });
    }
  }

  ngOnInit(): void {
    this.isUserCreated = false;
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: [''],
      regon: [''],
      krs: [''],
      type: [''],
    });
  }

}
