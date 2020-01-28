import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LpWebhooksFormComponent} from './lp-webhooks-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LpWebhooksEndpointComponent} from '../lp-webhooks-endpoint/lp-webhooks-endpoint.component';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';

describe('LpWebhooksFormComponent', () => {
  let component: LpWebhooksFormComponent;
  let fixture: ComponentFixture<LpWebhooksFormComponent>;
  // input
  let webhooks = {
    'ms.MessagingEventNotification.ContentEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
    'ms.MessagingEventNotification.RichContentEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
    'ms.MessagingEventNotification.AcceptStatusEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
    'ms.MessagingEventNotification.ChatStateEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
    'cqm.ExConversationChangeNotification': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
    'retry': {'retention_time': 3600}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LpWebhooksFormComponent, LpWebhooksEndpointComponent],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MaterialModule,
          BrowserAnimationsModule
        ]
      })
      .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LpWebhooksFormComponent);
    component = fixture.componentInstance;
    component.webhooks = new Webhooks();
    component.webhooks.deserialize(webhooks);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

