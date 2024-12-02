import { TestBed } from '@angular/core/testing';

import { CurrencyFormatServiceService } from './currency-format-service.service';

describe('CurrencyFormatServiceService', () => {
  let service: CurrencyFormatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyFormatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
