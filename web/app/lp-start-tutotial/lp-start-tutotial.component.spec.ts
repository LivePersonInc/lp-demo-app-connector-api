import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpStartTutotialComponent } from './lp-start-tutotial.component';

describe('LpStartTutotialComponent', () => {
  let component: LpStartTutotialComponent;
  let fixture: ComponentFixture<LpStartTutotialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpStartTutotialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpStartTutotialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
