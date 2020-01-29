import {LpAppInstallationsComponent} from './lp-app-installations.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../material.module';
import {LpEngagementFormComponent} from '../lp-engagement-form/lp-engagement-form.component';
import {LpWebhooksFormComponent} from '../lp-webhooks-form/lp-webhooks-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LpWebhooksEndpointComponent} from '../lp-webhooks-endpoint/lp-webhooks-endpoint.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LpAppInstallationsComponent', () => {
  let component: LpAppInstallationsComponent;
  let fixture: ComponentFixture<LpAppInstallationsComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LpAppInstallationsComponent, LpWebhooksFormComponent, LpEngagementFormComponent, LpWebhooksEndpointComponent],
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
    fixture = TestBed.createComponent(LpAppInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  
});
