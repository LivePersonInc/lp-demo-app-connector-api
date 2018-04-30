import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpAppKeySecretComponent } from './lp-app-key-secret.component';

describe('LpAppKeySecretComponent', () => {
  let component: LpAppKeySecretComponent;
  let fixture: ComponentFixture<LpAppKeySecretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpAppKeySecretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAppKeySecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
