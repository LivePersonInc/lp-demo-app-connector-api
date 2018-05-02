import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpNavMenuComponent } from './lp-nav-menu.component';
import {MaterialModule} from "../../material.module";

describe('LpNavMenuComponent', () => {
  let component: LpNavMenuComponent;
  let fixture: ComponentFixture<LpNavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpNavMenuComponent ]
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
