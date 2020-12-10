import { Inject } from '@angular/core';
import { Employee, UpdatedEmployee } from './../../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRole } from 'src/app/models/user-role.model';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() isEdit: boolean;

  workTypes = [
    { value: 'full-time', viewValue: 'Pełen etat'},
    { value: 'part-time', viewValue: 'Część etatu'}
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  addEmployeeForm: FormGroup;
  addEmployeeErrors: Array<string> = [];

  employeeNameMaxLength = 15;
  employeeSurnameMaxLength = 15;
  passwordMaxLength = 20;
  emailMaxLength = 30;

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
    if (this.addEmployeeForm.valid && this.addEmployeeErrors.length === 0) {
      if (!this.isEdit) {
        const employee: Employee = {
          name: this.addEmployeeForm.controls.name.value,
          surname: this.addEmployeeForm.controls.surname.value,
          password: this.addEmployeeForm.controls.password.value,
          email: this.addEmployeeForm.controls.email.value,
          workType: this.addEmployeeForm.controls.workType.value,
          role: UserRole.EMPLOYEE
        };
        this.dialogRef.close(employee);
      } else {
        const updatedEmployee: UpdatedEmployee = {
          id: this.data._id,
          rev: this.data._rev,
          name: this.addEmployeeForm.controls.name.value,
          surname: this.addEmployeeForm.controls.surname.value,
          password: this.addEmployeeForm.controls.password.value,
          email: this.addEmployeeForm.controls.email.value,
          workType: this.addEmployeeForm.controls.workType.value,
          role: UserRole.EMPLOYEE
        };
        this.dialogRef.close(updatedEmployee);
      }
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.addEmployeeForm = this.fb.group({
        name: [this.data.name, Validators.required],
        surname: [this.data.surname, Validators.required],
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        workType: [this.data.workType === this.workTypes[0].viewValue ? this.workTypes[0].value : this.workTypes[1].value,
                  Validators.required],
      });
    } else {
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

}
