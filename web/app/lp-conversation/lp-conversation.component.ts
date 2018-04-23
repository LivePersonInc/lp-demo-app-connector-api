import {Component, ComponentRef, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "../core/services/send-api.service";
import {Conversation} from "../shared/models/conversation/conversation";
import {EventSourcePolyfill} from 'ng-event-source';
import {LpChatBoxComponent} from "../lp-chat-box/lp-chat-box.component";
import {LoadingService} from "../core/services/loading.service";
import {ConversationService} from "../core/services/conversation.service";
import {ConversationEvent, ConvEvent} from "../shared/models/conversation/conversationEvent.model";
import {AuthenticationService} from "../core/services/authentication.service";
import {InstallationService} from "../core/services/istallation.service";

@Component({
  selector: 'lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.scss']
})
export class LpConversationComponent implements OnInit {
  public brandId: string;
  public conversation: Conversation;
  public appKey: string;
  public appSecret: string;
  public userName: string;

  constructor(private conversationService: ConversationService,
              private authenticationService: AuthenticationService,
              private appInstallationServie: InstallationService) { }

  ngOnInit() {
    if(this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId || "";
    }
    if(this.appInstallationServie.selectedApp){
      this.appKey = this.appInstallationServie.selectedApp.client_id || "";
      this.appSecret = this.appInstallationServie.selectedApp.client_secret || "";
    }

    this.userName = "Consumer Name";

    if(this.conversationService.conversation){
      this.conversation = this.conversationService.conversation;
    }

    this.conversationService.conversationEventSubject.subscribe( (event:ConversationEvent) => {
       if(this.conversationService.conversation && event.conversationId === this.conversationService.conversation.conversationId){
         console.log(event.event);
         if(event.event === ConvEvent.OPEN ){
           this.conversation = this.conversationService.conversation;
         }
       }
    });
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
