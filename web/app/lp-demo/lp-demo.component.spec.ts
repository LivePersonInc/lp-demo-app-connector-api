import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpDemoComponent } from './lp-demo.component';

describe('LpDemoComponent', () => {
  let component: LpDemoComponent;
  let fixture: ComponentFixture<LpDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
