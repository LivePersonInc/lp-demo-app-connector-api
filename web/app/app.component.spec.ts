import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {LpHeaderComponent} from "./lp-header/lp-header.component";
import {MatSpinner} from "@angular/material";
import {LpNavComponent} from "./lp-header/lp-nav/lp-nav.component";
import {LpHeaderModule} from "./lp-header/lp-header.module";
import {MaterialModule} from "./material.module";
import {LoadingService} from "./core/services/loading.service";
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        LpHeaderModule,
        MaterialModule
      ],
      providers: [LoadingService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
