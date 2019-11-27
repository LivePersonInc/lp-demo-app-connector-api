import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from "@angular/router";
import { LpNavComponent } from './lp-nav.component';
import {MaterialModule} from "../../../material.module";
import {AuthenticationService} from "../../../core/services/authentication.service";
import { MatDialog } from "@angular/material/dialog";


describe('LpNavComponent', () => {
  let component: LpNavComponent;
  let fixture: ComponentFixture<LpNavComponent>;

  beforeEach(async(() => {
    const authenticationService = jasmine.createSpy('AuthenticationService');
    const router = jasmine.createSpy( 'Router');
    const matDialog = jasmine.createSpy( 'MatDialog');

    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpNavComponent ],
      providers: [
        {provide:AuthenticationService, useValue: authenticationService},
        {provide:MatDialog, useValue: matDialog},
        {provide:Router, useValue: router}
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
