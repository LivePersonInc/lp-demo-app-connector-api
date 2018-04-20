import {Component, ComponentRef, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "../core/services/send-api.service";
import {Conversation} from "../shared/models/conversation/conversation";
import {EventSourcePolyfill} from 'ng-event-source';
import {LpChatBoxComponent} from "../lp-chat-box/lp-chat-box.component";
import {LoadingService} from "../core/services/loading.service";
import {ConversationService} from "../core/services/conversation.service";
import {ConversationEvent} from "../shared/models/conversation/conversationEvent.model";

@Component({
  selector: 'lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.scss']
})
export class LpConversationComponent implements OnInit {
  public brandId: string;
  public conversation: Conversation;
  public isConvStarted: boolean;
  public appKey: string;
  public appSecret: string;
  public eventSource: EventSourcePolyfill;
  public userName: string;

  @ViewChild('chatbox') private chatBox: LpChatBoxComponent;

  constructor(public snackBar: MatSnackBar,public sendApiService: SendApiService, private zone: NgZone, private  loadingService: LoadingService, private  conversationService: ConversationService) { }

  ngOnInit() {
    this.brandId = environment.brandId;
    this.appKey = environment.appKey;
    this.appSecret = environment.appSecret;
    this.userName = "test user name";

    this.conversationService.conversationEventSubject.subscribe( (event:ConversationEvent) => {
       if(event.conversationId === this.conversation.conversationId){
         console.log(event.event);
       }
    })
  }

  public startConversation(initialMessage: string) {

    this.conversation = this.conversationService.openConversation(this.userName, this.brandId, this.appKey, this.appSecret, initialMessage);

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
