import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpRequestsConsoleComponent } from './lp-requests-console.component';

describe('LpRequestsConsoleComponent', () => {
  let component: LpRequestsConsoleComponent;
  let fixture: ComponentFixture<LpRequestsConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpRequestsConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpRequestsConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
