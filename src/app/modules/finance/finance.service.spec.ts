import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FinanceService } from './finance.service';

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(FinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
