import {Component, OnDestroy, OnInit} from '@angular/core';
import {Conversation} from "../shared/models/conversation/conversation";
import {ConversationService} from "../core/services/conversation.service";
import {ConversationEvent, ConvEvent} from "../shared/models/conversation/conversationEvent.model";
import {AuthenticationService} from "../core/services/authentication.service";
import {InstallationService} from "../core/services/istallation.service";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.scss']
})
export class LpConversationComponent implements OnInit, OnDestroy {
  public brandId: string;
  public conversation: Conversation;
  public appKey: string;
  public appSecret: string;
  public userName: string;
  private conversationSubscription: ISubscription;

  constructor(private conversationService: ConversationService,
              private authenticationService: AuthenticationService,
              private installationService: InstallationService) { }

  ngOnInit() {
    if(this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId || "";
    }
    if(this.installationService .selectedApp){
      this.appKey = this.installationService.selectedApp.client_id || "";
      this.appSecret = this.installationService.selectedApp.client_secret || "";
    }

    this.userName = "Consumer Name";

    if(this.conversationService.conversation){
      this.conversation = this.conversationService.conversation;
    }

    this.conversationSubscription = this.conversationService.conversationEventSubject.subscribe( (event:ConversationEvent) => {
       if(this.conversationService.conversation && event.conversationId === this.conversationService.conversation.conversationId){
         console.log(event.event);
         if(event.event === ConvEvent.OPEN ){
           this.conversation = this.conversationService.conversation;
         }
       }
    });
  }

  ngOnDestroy(){
   if(this.conversationSubscription) this.conversationSubscription.unsubscribe();
  }

  public startConversation(initialMessage: string) {
    this.conversationService.openConversation(this.userName, this.brandId, this.appKey, this.appSecret, initialMessage);
  }

  public closeConversation() {
    this.conversationService.closeConversation(this.conversation.conversationId);
  }

  public sendMessage(messageText : string) {
    if(this.conversation &&  this.conversation.isConvStarted){
      this.conversationService.sendMessage(messageText, this.conversation.conversationId);
    }else{
      this.startConversation(messageText);
    }
  }


}
