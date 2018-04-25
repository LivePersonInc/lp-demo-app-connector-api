import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpConfirmationDialogComponent } from './lp-confirmation-dialog.component';

describe('LpConfirmationDialogComponent', () => {
  let component: LpConfirmationDialogComponent;
  let fixture: ComponentFixture<LpConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
