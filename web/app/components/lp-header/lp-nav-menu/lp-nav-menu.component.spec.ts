import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import { LpNavMenuComponent } from './lp-nav-menu.component';
import {MaterialModule} from "../../../material.module";
import {AuthenticationService} from "../../../core/services/authentication.service";

describe('LpNavMenuComponent', () => {
  let component: LpNavMenuComponent;
  let fixture: ComponentFixture<LpNavMenuComponent>;

  beforeEach(async(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');
    const router = jasmine.createSpy( 'Router');
    const matDialog = jasmine.createSpy( 'MatDialog');

    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpNavMenuComponent ],
      providers: [
        {provide:AuthenticationService, useValue: authenticationService},
        {provide:MatDialog, useValue: matDialog},
        {provide:Router, useValue: router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
