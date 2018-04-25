import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppKeySecretComponent } from './lp-app-key-secret.component';

describe('AppKeySecretComponent', () => {
  let component: AppKeySecretComponent;
  let fixture: ComponentFixture<AppKeySecretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppKeySecretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppKeySecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
