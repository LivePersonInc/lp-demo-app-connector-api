import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LpDemoComponent } from './lp-demo.component';
import {MaterialModule} from "../material.module";
import {LpConversationModule} from "../lp-conversation/lp-conversation.module";
import {LpTestServicesComponent} from "../lp-test-services/lp-test-services.component";
import {FormsModule} from "@angular/forms";
import {ConversationService} from "../core/services/conversation.service";
import {AuthenticationService} from "../core/services/authentication.service";
import {InstallationService} from "../core/services/istallation.service";
import {SendApiService} from "../core/services/send-api.service";
import {LoadingService} from "../core/services/loading.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LpDemoComponent', () => {
 /* let component: LpDemoComponent;
  let fixture: ComponentFixture<LpDemoComponent>;

  const authenticationService = { //MOCK
    userLoggedSubject:{
      subscribe: () => {}
    }
  };
  const conversationService = {
    conversation: {},
    conversationEventSubject:{
      subscribe: () => {}
    }
  };
  const installationService = {
    selectedApp:{
      client_id: "XXX",
      client_secret: "XXXX"
    }
  };
  const loadingService = { //MOCK
    isLoadingSubscription:() => {}
  };
  const sendApiService = jasmine.createSpy( 'SendApiService');


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        LpConversationModule,
        BrowserAnimationsModule,
        FormsModule],
      declarations: [ LpDemoComponent, LpTestServicesComponent ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: ConversationService, useValue: conversationService},
        {provide: InstallationService, useValue: installationService},
        {provide: SendApiService, useValue: sendApiService},
        {provide: LoadingService, useValue: loadingService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
