import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LpEditAppInstallationComponent} from './lp-edit-app-installation.component';
import {MaterialModule} from '../../../material.module';
import {LpEngagementFormComponent} from '../lp-engagement-form/lp-engagement-form.component';
import {LpWebhooksFormComponent} from '../lp-webhooks-form/lp-webhooks-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LpWebhooksEndpointComponent} from '../lp-webhooks-endpoint/lp-webhooks-endpoint.component';
import {AppInstall} from '../../../shared/models/app-installation/appInstall.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import appInstallationJson from '../../../shared/mocks/appInstallation.json';

describe('LpEditAppIntallationComponent', () => {
  let component: LpEditAppInstallationComponent;
  let fixture: ComponentFixture<LpEditAppInstallationComponent>;
  const appInstallJSON = appInstallationJson;
  
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
    component.appInstall.deserialize(appInstallJSON);
    component.ngOnInit();
    fixture.detectChanges();
  });
  
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contain the tested properites from the app Installation JSON object', () => {
    expect(component.appInstall.client_name).toEqual('Test Name');
    expect(component.appInstall.scope).toEqual('msg.consumer');
    expect(component.appInstall.grant_types).toEqual(['client_credentials']);
    expect(component.appInstall.capabilities.webhooks['ms.MessagingEventNotification.ContentEvent'].endpoint).toEqual('https://your/webhooks/endpoint');
    expect(component.appInstall.capabilities.webhooks.retry.retention_time).toEqual(3600);
    expect(component.appInstall.capabilities.engagement.design_engagement).toEqual(false);
    expect(component.appInstall.capabilities.engagement.entry_point).toEqual(['section']);
    expect(component.appInstall.capabilities.engagement.visitor_behavior).toEqual(['flow']);
    expect(component.appInstall.capabilities.engagement.consumer_identity).toEqual(['auth']);
  });
  
  it('should containt the properties that are not in the Type AppInstallation', () => {
    // 'This property is not in the Type AppInstallation but is must be assign to the object in order to don't remove data when update
    expect(component.appInstall.hasOwnProperty('response_types')).toBe(true);
    expect(component.appInstall['response_types']).toEqual(['code', 'token', 'id_token']);
    
    // this property does not exist in a reall app installation
    // console.log(component.appInstall['response_types']);
    // expect(component.appInstall['broadcast'].hasOwnProperty('enabled')).toBe(true);
    
  });
  
  it('Should has the same value than in the app instalation JSON', () => {
    expect(component.form.controls['appName'].value).toEqual('Test Name');
  });
  
  it('Should update the app properties when the form value changes', () => {
    expect(component.form.controls['appName'].value).toEqual('Test Name');
    component.form.controls['appName'].setValue('New Name');
    component.updateEditableApplicationFields();
    expect(component.form.controls['appName'].value).toEqual('New Name');
    expect(component.appInstall.client_name).toEqual('New Name');
    
  });
  
  it('Should add the default engagement object when Updating an app if appInstallation JSON has no engagement object', () => {
    const appInstallJsonNoEngagment = {
      'client_name': 'Test Name',
      'description': 'This is a description',
      'enabled': true,
      'grant_types': ['client_credentials'],
      'response_types': ['code', 'token', 'id_token'],
      'scope': 'msg.consumer',
      'logo_uri': '/src/modules/campaigns/assets/img/software/Mobile-App.png',
      'capabilities': {
        'webhooks': {
          'ms.MessagingEventNotification.ContentEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
          'ms.MessagingEventNotification.RichContentEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
          'ms.MessagingEventNotification.AcceptStatusEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
          'ms.MessagingEventNotification.ChatStateEvent': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
          'cqm.ExConversationChangeNotification': {'headers': [], 'endpoint': 'https://your/webhooks/endpoint'},
          'retry': {'retention_time': 3600}
        }
      },
      'client_id_issued_at': 1579856355,
      'client_secret_expires_at': 0,
      'client_id': 'xxxx-wewe-43e0-we-xxxxxxx',
      'client_secret': 'xxxxewerq3r2qt',
      'id': 'xxxx-b353-xx-bdc9-xxxxx',
      'deleted': false
    };
    
    component.appInstall = new AppInstall();
    fixture.detectChanges();
    component.appInstall.deserialize(appInstallJsonNoEngagment);
    component.ngOnInit();
    fixture.detectChanges();
    component.ngAfterViewInit();
    fixture.detectChanges();
    
    expect(component.appInstall.capabilities.engagement).toBeNull();
    
    component.updateEditableApplicationFields();
    
    expect(component.appInstall.capabilities.engagement).toBeDefined();
    
  });
  
});

