import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpEnableAsycComponent } from './lp-enable-asyc.component';

describe('LpEnableAsycComponent', () => {
  let component: LpEnableAsycComponent;
  let fixture: ComponentFixture<LpEnableAsycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpEnableAsycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpEnableAsycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
