import { TestBed, async, inject } from '@angular/core/testing';

import { DomainHeaderInterceptor } from './domain-header.interceptor';
import {DomainsService} from "../services/domains.service";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

describe('DomainHeaderInterceptor', () => {
  beforeEach(() => {
    const domainsService = jasmine.createSpy('DomainsService');
    TestBed.configureTestingModule({
      providers: [DomainHeaderInterceptor, {provide: DomainsService, useValue: domainsService}]
    });
  });

  it('should inject the service', inject([DomainHeaderInterceptor], (intercptor: DomainHeaderInterceptor) => {
    expect(intercptor).toBeTruthy();
  }));

  it('Should return the first first url element after the domain', inject([DomainHeaderInterceptor], (intercptor: DomainHeaderInterceptor) => {
    const url = 'http://localhost:8282/account/properties/le92127075';
    expect(intercptor.getServiceNameByUrl(url)).toBe('account');
  }));


});
