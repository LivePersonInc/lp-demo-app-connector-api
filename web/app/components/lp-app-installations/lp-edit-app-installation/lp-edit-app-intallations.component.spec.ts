import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LpEditAppInstallationComponent} from './lp-edit-app-installation.component';
import {MaterialModule} from '../../../material.module';
import {LpEngagementFormComponent} from '../lp-engagement-form/lp-engagement-form.component';
import {LpWebhooksFormComponent} from '../lp-webhooks-form/lp-webhooks-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LpWebhooksEndpointComponent} from '../lp-webhooks-endpoint/lp-webhooks-endpoint.component';
import {AppInstall} from '../../../shared/models/app-installation/appInstall.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LpEditAppIntallationComponent', () => {
  let component: LpEditAppInstallationComponent;
  let fixture: ComponentFixture<LpEditAppInstallationComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LpEditAppInstallationComponent, LpWebhooksFormComponent, LpEngagementFormComponent, LpWebhooksEndpointComponent],
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
    fixture = TestBed.createComponent(LpEditAppInstallationComponent);
    component = fixture.componentInstance;
    
    // Input()
    component.appInstall = new AppInstall();
    
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  
});

