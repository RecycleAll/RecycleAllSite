import { TestBed } from '@angular/core/testing';

import { Don.ServiceService } from './don.service.service';

describe('Don.ServiceService', () => {
  let service: Don.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Don.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
