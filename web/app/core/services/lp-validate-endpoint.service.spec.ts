import { TestBed } from '@angular/core/testing';

import { LpValidateEndpointService } from './lp-validate-endpoint.service';

describe('LpValidateEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LpValidateEndpointService = TestBed.get(LpValidateEndpointService);
    expect(service).toBeTruthy();
  });
});
