import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitResponseDialogComponent } from './wait-response-dialog.component';

describe('WaitResponseDialogComponent', () => {
  let component: WaitResponseDialogComponent;
  let fixture: ComponentFixture<WaitResponseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitResponseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
