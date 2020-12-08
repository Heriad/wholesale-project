import { TestBed } from '@angular/core/testing';

import { CompleteTheOrderAuthGuard } from './complete-the-order-auth-guard.service';

describe('CompleteTheOrderAuthGuard', () => {
  let guard: CompleteTheOrderAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompleteTheOrderAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
