import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Conversation} from "../shared/models/conversation/conversation";
import {LpConversationComponent} from './lp-conversation.component';
import {MaterialModule} from "../material.module";
import {FormsModule} from "@angular/forms";
import {LpChatBoxComponent} from "./lp-chat-box/lp-chat-box.component";
import {LpConsoleComponent} from "./lp-console/lp-console.component";
import {LpConversationModule} from "./lp-conversation.module";
import {LpChatBoxMessageComponent} from "./lp-chat-box/lp-chat-box-message/lp-chat-box-message.component";
import {LpChatBoxFooterComponent} from "./lp-chat-box/lp-chat-box-footer/lp-chat-box-footer.component";
import {AuthenticationService} from "../core/services/authentication.service";
import {ConversationService} from "../core/services/conversation.service";
import {InstallationService} from "../core/services/istallation.service";

describe('LpConversationComponent', () => {
  let component: LpConversationComponent;
  let fixture: ComponentFixture<LpConversationComponent>;

  beforeEach(async(() => {
    const authenticationService = { //MOCK
      userLoggedSubject:{
        subscribe: () => {}
      }
    };
    const conversationService = jasmine.createSpy( 'ConversationService');
    const installationService = jasmine.createSpy( 'InstallationService');

    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      declarations: [
        LpConversationComponent,
        LpChatBoxComponent,
        LpConsoleComponent,
        LpChatBoxMessageComponent,
        LpChatBoxFooterComponent
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: ConversationService, useValue: conversationService},
        {provide: InstallationService, useValue: installationService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
