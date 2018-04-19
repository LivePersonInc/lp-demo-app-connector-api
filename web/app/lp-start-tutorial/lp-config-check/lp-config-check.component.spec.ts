import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpConfigCheckComponent } from './lp-config-check.component';

describe('LpConfigCheckComponent', () => {
  let component: LpConfigCheckComponent;
  let fixture: ComponentFixture<LpConfigCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpConfigCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpConfigCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
