import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {ConversationService} from "../../core/services/conversation.service";
import {ConversationEvent, ConvEvent} from "../../shared/models/conversation/conversationEvent.model";
import {AuthenticationService} from "../../core/services/authentication.service";
import {InstallationService} from "../../core/services/istallation.service";
import {Subscription} from "rxjs";
import {Options} from "../../shared/models/conversation/options.model";

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

  constructor(private conversationService: ConversationService,
              private authenticationService: AuthenticationService,
              private installationService: InstallationService) { }

 @HostListener('document:visibilitychange', ['$event'])
  onFocus(event: any): void {
    if(document.hidden) {
      this.onHidden();
    } else {
      this.onVisible();
    }
  }

  ngOnInit() {
    this.init();
    this.conversationService.conversationRestoredSubject.subscribe( event => {
      this.init();
    });
  }

  ngOnDestroy(){
   if(this.conversationSubscription) this.conversationSubscription.unsubscribe();
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

  public sendMessage(messageText : string) {
    if(this.conversation &&  this.conversation.isConvStarted) {
      this.conversationService.notifyAgentThatUserStopsTyping();
      this.conversationService.sendMessage(messageText);
    }else{
      this.startConversation(messageText);
    }
  }

  public sendFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.conversationService.sendFile(file,"");
    }
  }

  public onConversationChange(conversationChange: Options) {
    this.userName = conversationChange.userName;
    this.options = conversationChange;

  }

  public isConversationDisabled(): boolean {
    return !this.userName || !this.brandId || !this.appSecret || !this.appSecret
  }

  public isSurveyStarted(): boolean {
    return this.conversationService.getIsSurveyStarted();
  }

  private subscribeToConversationEvents() {
    this.conversationSubscription = this.conversationService.conversationEventSubject.subscribe( (event:ConversationEvent) => {
      if(this.conversationService.conversation && event.conversationId === this.conversationService.conversation.conversationId) {

        if(event.event === ConvEvent.OPEN ) {
          this.conversation = this.conversationService.conversation;
        }

      }
    });
  }

  private init(): void {
    this.userName = 'Kim';

    if(this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId || "";
    }

    if(this.installationService.selectedApp){
      this.appKey = this.installationService.selectedApp.client_id || "";
      this.appSecret = this.installationService.selectedApp.client_secret || "";
    }

    if(this.conversationService.conversation){
      this.conversation = this.conversationService.conversation;
    }else  {
      this.conversation = new Conversation(this.brandId,this.appKey,this.appSecret, this.userName);
    }

    this.subscribeToConversationEvents();
  }

  private stopNotificationSent = false;
  private isFistTime = true;
  private timeout = null;

  public handleTypingEvent(isTyping) {
    if(isTyping && this.conversation && this.conversation.isConvStarted) {
      clearTimeout(this.timeout);

      if(this.stopNotificationSent || this.isFistTime) {
        this.conversationService.notifyAgentThatUserIsTyping();

        this.isFistTime = false;
         this.stopNotificationSent = false;
      }

      this.timeout = setTimeout( () => {

        this.conversationService.notifyAgentThatUserStopsTyping();

        this.stopNotificationSent = true;

        }, 1000);
    }

  }

  private onVisible(): void {
    if(this.conversation && this.conversation.isConvStarted) {
      this.conversationService.notifyAgentConsumerIsInTheChat();
      this.conversationService.notifyMessagesWasRead();
    }
  }

  private onHidden(): void {
    if(this.conversation && this.conversation.isConvStarted){
      this.conversationService.notifyAgentConsumerIsNotInTheChat();
    }
  }

}
