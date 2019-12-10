import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpAppInstallationsComponent } from './lp-app-installations.component';

describe('LpAppInstallationsComponent', () => {
  let component: LpAppInstallationsComponent;
  let fixture: ComponentFixture<LpAppInstallationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpAppInstallationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAppInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
