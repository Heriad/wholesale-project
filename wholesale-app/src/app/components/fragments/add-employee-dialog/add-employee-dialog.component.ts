import { Employee, UserRole } from './../../../models/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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

  addEmployee() {
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

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      name: [''],
      surname: [''],
      password: [''],
      repeatPassword: [''],
      email: [''],
      workType: [''],
    });
  }

}
