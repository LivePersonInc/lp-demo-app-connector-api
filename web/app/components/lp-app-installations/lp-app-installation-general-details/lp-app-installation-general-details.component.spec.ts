import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpAppInstallationGeneralDetailsComponent } from './lp-app-installation-general-details.component';

describe('LpAppInstallationGeneralDetailsComponent', () => {
  let component: LpAppInstallationGeneralDetailsComponent;
  let fixture: ComponentFixture<LpAppInstallationGeneralDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpAppInstallationGeneralDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAppInstallationGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
