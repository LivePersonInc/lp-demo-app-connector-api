import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpNavComponent } from './lp-nav.component';
import {MaterialModule} from "../../../material.module";
import {AuthenticationService} from "../../../core/services/authentication.service";

describe('LpNavComponent', () => {
  let component: LpNavComponent;
  let fixture: ComponentFixture<LpNavComponent>;

  beforeEach(async(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpNavComponent ],
      providers: [
        {provide:AuthenticationService, useValue: authenticationService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
