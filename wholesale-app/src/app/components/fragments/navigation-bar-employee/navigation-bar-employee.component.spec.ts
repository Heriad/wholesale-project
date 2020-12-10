import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarEmployeeComponent } from './navigation-bar-employee.component';

describe('NavigationBarEmployeeComponent', () => {
  let component: NavigationBarEmployeeComponent;
  let fixture: ComponentFixture<NavigationBarEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
