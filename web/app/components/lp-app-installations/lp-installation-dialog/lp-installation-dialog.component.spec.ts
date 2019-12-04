import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpInstallationDialogComponent } from './lp-installation-dialog.component';

describe('LpInstallationDialogComponent', () => {
  let component: LpInstallationDialogComponent;
  let fixture: ComponentFixture<LpInstallationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpInstallationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpInstallationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
