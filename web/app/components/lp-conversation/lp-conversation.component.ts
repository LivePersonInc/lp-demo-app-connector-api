import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Conversation} from '../../shared/models/conversation/conversation.model';
import {ConversationService} from '../../core/services/conversation.service';
import {ConversationEvent, ConvEvent} from '../../shared/models/conversation/conversationEvent.model';
import {AuthenticationService} from '../../core/services/authentication.service';
import {InstallationService} from '../../core/services/installation.service';
import {Subscription} from 'rxjs';
import {Options} from '../../shared/models/conversation/options.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.scss']
})
export class LpConversationComponent implements OnInit, OnDestroy {
  public brandId: string;
  public appKey: string;
  public appSecret: string;
  public userName: string;
  public options: Options;
  public conversation: Conversation;
  private conversationSubscription: Subscription;
  private installationSubscription: Subscription;
  private conversationRestoredSubscription: Subscription;
  private stopNotificationSent = false;
  private isFistTime = true;
  private timeout = null;
  
  constructor(private conversationService: ConversationService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private installationService: InstallationService) {
  }
  
  @HostListener('document:visibilitychange', ['$event'])
  onFocus(event: any): void {
    if (document.hidden) {
      this.onHidden();
    } else {
      this.onVisible();
    }
  }
  
  ngOnInit() {
    if (this.authenticationService.user) {
      this.init();
    } else {
      // needed when browser refresh
      this.authenticationService.userLoggedSubject.subscribe(event => {
        if (event === 'USER-SET') {
          this.installationService.init();
          this.init();
        }
      });
    }
  }
  
  ngOnDestroy() {
    if (this.conversationSubscription) {
      this.conversationSubscription.unsubscribe();
    }
    if (this.installationSubscription) {
      this.installationSubscription.unsubscribe();
    }
    if (this.conversationRestoredSubscription) {
      this.conversationRestoredSubscription.unsubscribe();
    }
  }
  
  public startConversation(initialMessage: string) {
    this.conversationService.openConversation(this.brandId, this.appKey, this.appSecret, this.userName, initialMessage, this.options);
  }
  
  public closeConversation() {
    this.conversationService.closeConversation();
  }
  
  public closeConversationWithPCS() {
    this.conversationService.closeConversationWithPCS();
  }
  
  public sendMessage(messageText: string) {
    if (this.conversation && this.conversation.isConvStarted) {
      this.conversationService.notifyAgentThatUserStopsTyping();
      this.conversationService.sendMessage(messageText);
    } else {
      this.startConversation(messageText);
    }
  }
  
  public sendFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.conversationService.sendFile(file, '');
    }
  }
  
  public onConversationChange(conversationChange: Options) {
    this.userName = conversationChange.userName;
    this.options = conversationChange;
    
  }
  
  public isConversationDisabled(): boolean {
    return !this.userName || !this.brandId || !this.appSecret || !this.appSecret
  }
  
  private subscribeToConversationEvents() {
    this.conversationSubscription = this.conversationService.conversationEventSubject.subscribe((event: ConversationEvent) => {
      if (this.conversationService.conversation && event.conversationId === this.conversationService.conversation.conversationId) {
        if (event.event === ConvEvent.OPEN) {
          this.conversation = this.conversationService.conversation;
        }
        
      }
    });
  }
  
  private init(): void {
    this.appKey = '';
    this.appSecret = '';
    this.userName = 'Kim';
    if (this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId || '';
    }
    
    if (this.brandId) {
      this.route.paramMap.subscribe(params => {
        if (params.get('appId')) {
          const state = this.installationService.restoreState();
          if (!state || !state.selectedAppId) {
            this.installationService.getAppByAppId(params.get('appId'));
          }
        }
      });
    }
    
    this.installationSubscription = this.installationService.installationSubject.subscribe(val => {
      if (val === 'APP_SECRET_FOUND') {
        if (this.installationService.selectedApp) {
          this.appKey = this.installationService.selectedApp.client_id;
          this.appSecret = this.installationService.selectedApp.client_secret;
        }
        this.conversationRestoredSubscription = this.conversationService.conversationRestoredSubject.subscribe(event => {
          if (event === 'RESTORED') {
            if (this.conversationService.conversation) {
              this.conversation = this.conversationService.conversation;
            }
          } else if (event === 'APP_NO_STATE') {
            this.conversation = new Conversation(this.brandId, this.appKey, this.appSecret, this.userName);
          }
        });
        this.conversationService.restoreStoredState('RESTORED', new Conversation(this.brandId, this.appKey, this.appSecret, this.userName));
      }
    });
    this.subscribeToConversationEvents();
  }
  
  
  public handleTypingEvent(isTyping) {
    if (isTyping && this.conversation && this.conversation.isConvStarted) {
      clearTimeout(this.timeout);
      if (this.stopNotificationSent || this.isFistTime) {
        this.conversationService.notifyAgentThatUserIsTyping();
        this.isFistTime = false;
        this.stopNotificationSent = false;
      }
      this.timeout = setTimeout(() => {
        this.conversationService.notifyAgentThatUserStopsTyping();
        this.stopNotificationSent = true;
      }, 1000);
    }
  }
  
  private onVisible(): void {
    if (this.conversation && this.conversation.isConvStarted) {
      this.conversationService.notifyAgentConsumerIsInTheChat();
      this.conversationService.notifyMessagesWasRead();
    }
  }
  
  private onHidden(): void {
    if (this.conversation && this.conversation.isConvStarted) {
      this.conversationService.notifyAgentConsumerIsNotInTheChat();
    }
  }
  
}
