import { TestBed } from '@angular/core/testing';

import { ErrorsHandlerService } from './errors-handler.service';

describe('ErrorsHandler.ServiceService', () => {
  let service: ErrorsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
