import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpEditAppIntallationDialogComponent } from './lp-edit-app-intallation-dialog.component';

describe('LpEditAppIntallationDialogComponent', () => {
  let component: LpEditAppIntallationDialogComponent;
  let fixture: ComponentFixture<LpEditAppIntallationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpEditAppIntallationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpEditAppIntallationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
