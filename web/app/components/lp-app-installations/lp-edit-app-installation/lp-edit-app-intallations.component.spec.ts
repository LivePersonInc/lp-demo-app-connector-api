import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpEditAppIntallationComponent } from './lp-edit-app-installation.component';

describe('LpEditAppIntallationComponent', () => {
  let component: LpEditAppIntallationComponent;
  let fixture: ComponentFixture<LpEditAppIntallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpEditAppIntallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpEditAppIntallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});