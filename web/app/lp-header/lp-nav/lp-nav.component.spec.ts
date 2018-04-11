import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpNavComponent } from './lp-nav.component';

describe('LpNavComponent', () => {
  let component: LpNavComponent;
  let fixture: ComponentFixture<LpNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
