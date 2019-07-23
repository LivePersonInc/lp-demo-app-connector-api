import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpWebhooksEventComponent } from './lp-webhooks-event.component';

describe('LpWebhooksEventComponent', () => {
  let component: LpWebhooksEventComponent;
  let fixture: ComponentFixture<LpWebhooksEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpWebhooksEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpWebhooksEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
