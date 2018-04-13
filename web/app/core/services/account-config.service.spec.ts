import { TestBed, inject } from '@angular/core/testing';

import { AccountConfigService } from './account-config.service';

describe('AccountConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountConfigService]
    });
  });

  it('should be created', inject([AccountConfigService], (service: AccountConfigService) => {
    expect(service).toBeTruthy();
  }));
});
