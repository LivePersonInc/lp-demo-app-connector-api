import { TestBed, inject } from '@angular/core/testing';

import { IstallationService } from './istallation.service';

describe('IstallationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IstallationService]
    });
  });

  it('should be created', inject([IstallationService], (service: IstallationService) => {
    expect(service).toBeTruthy();
  }));
});
