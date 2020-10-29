import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotificationDialogComponent } from './order-notification-dialog.component';

describe('OrderNotificationDialogComponent', () => {
  let component: OrderNotificationDialogComponent;
  let fixture: ComponentFixture<OrderNotificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNotificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
