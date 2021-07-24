import { TestBed } from '@angular/core/testing';

import { DonProductService } from './don-product.service';

describe('DonProductService', () => {
  let service: DonProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
