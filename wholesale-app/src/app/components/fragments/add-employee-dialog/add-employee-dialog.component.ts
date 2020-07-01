import { Employee } from './../../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRole } from 'src/app/models/user-role.model';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;

  workTypes = [
    { value: 'full-time', viewValue: 'Pełen etat'},
    { value: 'part-time', viewValue: 'Część etatu'}
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddEmployeeDialogComponent>) { }

  addEmployeeForm: FormGroup;
  addEmployeeErrors: Array<string> = [];

  addEmployee() {
    this.addEmployeeErrors = [];
    if (this.addEmployeeForm.controls.name.invalid || this.addEmployeeForm.controls.surname.invalid ||
          this.addEmployeeForm.controls.password.invalid || this.addEmployeeForm.controls.repeatPassword.invalid ||
      this.addEmployeeForm.controls.email.value.length === 0) {
      this.addEmployeeErrors.push('Uzupełnij wymagane pola');
    }
    if (this.addEmployeeForm.controls.email.value.length > 0 && this.addEmployeeForm.controls.email.invalid) {
      this.addEmployeeErrors.push('Wprowadź poprawny adres email');
    }
    if ((this.addEmployeeForm.controls.password.value.length && this.addEmployeeForm.controls.repeatPassword.value.length) < 8 &&
        (this.addEmployeeForm.controls.password.value.length || this.addEmployeeForm.controls.repeatPassword.value.length) > 0) {
      this.addEmployeeErrors.push('Hasło musi posiadać minimum 8 znaków');
    }
    if ((this.addEmployeeForm.controls.password.value !== this.addEmployeeForm.controls.repeatPassword.value) &&
        (this.addEmployeeForm.controls.password.value.length > 0 && this.addEmployeeForm.controls.repeatPassword.value.length)) {
      this.addEmployeeErrors.push('Hasła nie są jednakowe');
    }
    if (this.addEmployeeErrors.length > 0) {
      let height = 380;
      const errHeight = 24;
      height = height + (errHeight * this.addEmployeeErrors.length);
      const newHeight = String(height);
      this.dialogRef.updateSize('550px', newHeight + 'px');
    } else {
      this.dialogRef.updateSize('550px', '380px');
    }
    if (this.addEmployeeForm.valid && this.addEmployeeErrors.length === 0) {
      const employee: Employee = {
        name: this.addEmployeeForm.controls.name.value,
        surname: this.addEmployeeForm.controls.surname.value,
        password: this.addEmployeeForm.controls.password.value,
        email: this.addEmployeeForm.controls.email.value,
        workType: this.addEmployeeForm.controls.workType.value,
        type: UserRole.EMPLOYEE
      };
      this.dialogRef.close(employee);
    }
  }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workType: ['', Validators.required],
    });
  }

}
