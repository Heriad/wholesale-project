import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNotificationDialogComponent } from './cart-notification-dialog.component';

describe('CartNotificationDialogComponent', () => {
  let component: CartNotificationDialogComponent;
  let fixture: ComponentFixture<CartNotificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartNotificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
