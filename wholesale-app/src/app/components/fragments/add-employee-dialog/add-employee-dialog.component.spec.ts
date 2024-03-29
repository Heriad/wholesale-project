import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeDialogComponent } from './add-employee-dialog.component';

describe('AddEmployeeModalComponent', () => {
  let component: AddEmployeeDialogComponent;
  let fixture: ComponentFixture<AddEmployeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
