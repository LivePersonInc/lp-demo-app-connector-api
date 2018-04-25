import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhooksConfigComponent } from './lp-webhooks-config.component';

describe('WebhooksConfigComponent', () => {
  let component: WebhooksConfigComponent;
  let fixture: ComponentFixture<WebhooksConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhooksConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhooksConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
