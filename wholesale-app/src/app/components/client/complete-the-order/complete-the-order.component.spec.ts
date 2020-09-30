import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTheOrderComponent } from './complete-the-order.component';

describe('CompleteTheOrderComponent', () => {
  let component: CompleteTheOrderComponent;
  let fixture: ComponentFixture<CompleteTheOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTheOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTheOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
