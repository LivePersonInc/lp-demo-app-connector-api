import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpWebhooksHeadersComponent } from './lp-webhooks-headers.component';

describe('LpWebhooksHeadersComponent', () => {
  let component: LpWebhooksHeadersComponent;
  let fixture: ComponentFixture<LpWebhooksHeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpWebhooksHeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpWebhooksHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
