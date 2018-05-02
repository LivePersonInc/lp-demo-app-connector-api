import { TestBed, inject } from '@angular/core/testing';

import { ConversationService } from './conversation.service';
import {SendApiService} from "./send-api.service";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "./loading.service";

describe('ConversationService', () => {
  beforeEach(() => {
    const snackBar = jasmine.createSpy('MatSnackBar');
    const http = jasmine.createSpy('HttpClient');
    const loadingService = jasmine.createSpy('LoadingService');
    const sendApiService = jasmine.createSpy('SendApiService');
    TestBed.configureTestingModule({
      providers: [
        ConversationService,
        {provide: SendApiService, useValue: sendApiService},
        {provide: MatSnackBar, useValue: snackBar},
        {provide: HttpClient, useValue: http},
        {provide: LoadingService, useValue: loadingService}
      ]
    });

  });

  it('should be created', inject([ConversationService], (service: ConversationService) => {
    expect(service).toBeTruthy();
  }));

});
