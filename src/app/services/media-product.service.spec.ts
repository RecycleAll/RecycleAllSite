import { TestBed } from '@angular/core/testing';

import { MediaProductService } from './media-product.service';

describe('MediaProductService', () => {
  let service: MediaProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
