import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpWebhooksEndpointComponent } from './lp-webhooks-endpoint.component';

describe('LpWebhooksEndpointComponent', () => {
  let component: LpWebhooksEndpointComponent;
  let fixture: ComponentFixture<LpWebhooksEndpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpWebhooksEndpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpWebhooksEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
