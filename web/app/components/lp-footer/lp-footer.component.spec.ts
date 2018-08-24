import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpFooterComponent } from './lp-footer.component';

describe('LpFooterComponent', () => {
  let component: LpFooterComponent;
  let fixture: ComponentFixture<LpFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
