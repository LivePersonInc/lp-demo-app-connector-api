import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableAsycComponent } from './lp-enable-asyc.component';

describe('EnableAsycComponent', () => {
  let component: EnableAsycComponent;
  let fixture: ComponentFixture<EnableAsycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableAsycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableAsycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
