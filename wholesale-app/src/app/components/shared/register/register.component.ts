import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { UserRole } from 'src/app/models/user-role.model';
import { ApiResponse } from 'src/app/models/response.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiUrlsService } from './../../../services/api-urls.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  notifications;

  registerForm: FormGroup;
  isAccountCreated: boolean;
  userAlreadyExists: boolean;

  krsMaxLength = 10;
  regonMaxLength = 14;
  clientNameMaxLength = 15;
  clientEmailMaxLength = 30;
  companyNameMaxLength = 30;
  clientSurnameMaxLength = 15;
  clientPasswordMaxLength = 20;

  registerErrors: Array<string> = [];

  constructor(private fb: FormBuilder, public api: ApiUrlsService) {}

  getNotifications(notifications) {
    this.notifications = notifications;
    if (this.userAlreadyExists) {
      this.registerErrors = [];
      this.registerErrors.push(this.notifications.registerComponent.userAlreadyExists);
    } else if (this.registerErrors.length > 0) {
      this.validateRegisterForm();
    }
  }

  validateRegisterForm() {
    this.registerErrors = [];
    if (this.registerForm.controls.name.invalid || this.registerForm.controls.surname.invalid ||
        this.registerForm.controls.password.invalid || this.registerForm.controls.repeatPassword.invalid ||
        this.registerForm.controls.email.value.length === 0) {
      this.registerErrors.push(this.notifications.registerComponent.requiredFields);
    }
    if (this.registerForm.controls.email.value.length > 0 && this.registerForm.controls.email.invalid) {
      this.registerErrors.push(this.notifications.registerComponent.wrongEmail);
    }
    if ((this.registerForm.controls.password.value.length && this.registerForm.controls.repeatPassword.value.length) < 8 &&
        (this.registerForm.controls.password.value.length || this.registerForm.controls.repeatPassword.value.length) > 0) {
      this.registerErrors.push(this.notifications.registerComponent.passwordToShort);
    }
    if ((this.registerForm.controls.password.value !== this.registerForm.controls.repeatPassword.value) &&
        (this.registerForm.controls.password.value.length > 0 && this.registerForm.controls.repeatPassword.value.length)) {
      this.registerErrors.push(this.notifications.registerComponent.passwordNotMatch);
    }
  }

  registerUser() {
    this.validateRegisterForm();
    const client: Client = {
      name: this.registerForm.controls.name.value,
      surname: this.registerForm.controls.surname.value,
      password: this.registerForm.controls.password.value,
      email: this.registerForm.controls.email.value,
      companyName: this.registerForm.controls.companyName.value,
      regon: this.registerForm.controls.regon.value,
      krs: this.registerForm.controls.krs.value,
      role: UserRole.CLIENT,
    };
    if (this.registerForm.valid && this.registerErrors.length === 0) {
      this.api.createClient(client).subscribe((res: ApiResponse) => {
        if (res.success) {
          this.userAlreadyExists = false;
          this.isAccountCreated = true;
        }
      }, (err) => {
        if (!err.error.success && err.error.message === `Client ${this.registerForm.controls.email.value} already exists`) {
          this.userAlreadyExists = true;
          this.registerErrors.push(this.notifications.registerComponent.userAlreadyExists);
        }
      });
    }
  }

  ngOnInit(): void {
    this.isAccountCreated = false;
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      regon: [''],
      krs: [''],
      role: [''],
    });
  }

}
