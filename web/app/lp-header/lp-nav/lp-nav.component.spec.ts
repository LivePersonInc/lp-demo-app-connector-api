import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpNavComponent } from './lp-nav.component';
import {MaterialModule} from "../../material.module";

describe('LpNavComponent', () => {
  let component: LpNavComponent;
  let fixture: ComponentFixture<LpNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LpNavComponent ]
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
