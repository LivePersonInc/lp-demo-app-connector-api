import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpHeaderComponent } from './lp-header.component';
import {LpNavComponent} from "./lp-nav/lp-nav.component";
import {LpNavMenuComponent} from "./lp-nav-menu/lp-nav-menu.component";

describe('LpHeaderComponent', () => {
  let component: LpHeaderComponent;
  let fixture: ComponentFixture<LpHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpHeaderComponent, LpNavComponent, LpNavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
