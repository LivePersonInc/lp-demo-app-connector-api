import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpWebhooksInfoComponent } from './lp-webhooks-info.component';

describe('LpWebhooksInfoComponent', () => {
  let component: LpWebhooksInfoComponent;
  let fixture: ComponentFixture<LpWebhooksInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpWebhooksInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpWebhooksInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
