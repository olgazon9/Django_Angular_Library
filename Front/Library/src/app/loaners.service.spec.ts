import { TestBed } from '@angular/core/testing';

import { LoanersService } from './loaners.service';

describe('LoanersService', () => {
  let service: LoanersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
