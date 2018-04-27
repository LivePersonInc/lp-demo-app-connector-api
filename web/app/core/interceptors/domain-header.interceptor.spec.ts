import { TestBed, async, inject } from '@angular/core/testing';

import { DomainHeaderInterceptor } from './domain-header.interceptor';

describe('DomainHeaderInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomainHeaderInterceptor]
    });
  });

  it('should ...', inject([DomainHeaderInterceptor], (intercptor: DomainHeaderInterceptor) => {
    expect(intercptor).toBeTruthy();
  }));
});
