import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpEngagementFormComponent } from './lp-engagement-form.component';

describe('LpEngagementFormComponent', () => {
  let component: LpEngagementFormComponent;
  let fixture: ComponentFixture<LpEngagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpEngagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpEngagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
