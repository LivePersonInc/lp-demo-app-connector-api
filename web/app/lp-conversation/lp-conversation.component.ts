import {Component, OnDestroy, OnInit} from '@angular/core';
import {Conversation} from "../shared/models/conversation/conversation.model";
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
  public appKey: string;
  public appSecret: string;
  public userName: string;

  public conversation: Conversation;
  private conversationSubscription: ISubscription;

  constructor(private conversationService: ConversationService,
              private authenticationService: AuthenticationService,
              private installationService: InstallationService) { }

  ngOnInit() {
    this.userName = "John TestName";

    if(this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId || "";
    }
    if(this.installationService .selectedApp){
      this.appKey = this.installationService.selectedApp.client_id || "";
      this.appSecret = this.installationService.selectedApp.client_secret || "";
    }

    if(this.conversationService.conversation){
      this.conversation = this.conversationService.conversation;
    }else  {
      this.conversation = new Conversation(this.brandId,this.appKey,this.appSecret, this.userName);
    }

    this.conversationSubscription = this.conversationService.conversationEventSubject.subscribe( (event:ConversationEvent) => {
       if(this.conversationService.conversation && event.conversationId === this.conversationService.conversation.conversationId){

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
    this.conversationService.openConversation(this.brandId, this.appKey, this.appSecret, this.userName, initialMessage);
  }

  public closeConversation() {
    this.conversationService.closeConversation();
  }

  public sendMessage(messageText : string) {
    if(this.conversation &&  this.conversation.isConvStarted){
      this.conversationService.sendMessage(messageText);
    }else{
      this.startConversation(messageText);
    }
  }

  public onConsumerName(consumerName) {
    console.log(consumerName);
    this.conversation.userName = consumerName;
  }


}
