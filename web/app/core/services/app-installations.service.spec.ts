import { TestBed } from '@angular/core/testing';

import { AppInstallationsService } from './app-installations.service';

describe('AppInstallationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppInstallationsService = TestBed.get(AppInstallationsService);
    expect(service).toBeTruthy();
  });
});
