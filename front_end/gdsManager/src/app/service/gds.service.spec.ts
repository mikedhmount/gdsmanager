import { TestBed } from '@angular/core/testing';

import { GdsService } from './gds.service';

describe('GdsService', () => {
  let service: GdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
