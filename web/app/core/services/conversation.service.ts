import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "./send-api.service";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";
import {ConversationEvent, ConvEvent} from "../../shared/models/conversation/conversationEvent.model";
import {Conversation} from "../../shared/models/conversation/conversation";
import {InstallationService} from "./istallation.service";

@Injectable()
export class ConversationService extends HttpService{

  public conversationEventSubject = new Subject<ConversationEvent>();
  public conversation: Conversation;
  //public conversationList; // Hash table of Conversation accesed by convID

  constructor(protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService:LoadingService,
              protected sendApiService: SendApiService
  ){
    super(snackBar,http, loadingService);
  }

  public openConversation(userName: string, brandId: string, appKey: string, appSecret,initialMessage: string) {
    this.conversation = new Conversation(this.snackBar, this.sendApiService, brandId, appKey, appSecret, userName, this.loadingService);
    this.conversation.getAppJWT().then(resolve => {
      this.conversation.getAppConsumerJWS().then(resolve => {
        this.conversation.openConversation(initialMessage).then(conversationId => {
          this.conversation.isConvStarted = true;
          this.conversation.subscribeToMessageNotifications(conversationId);
          this.conversationEventSubject.next(new ConversationEvent(conversationId, ConvEvent.OPEN));
        });
      });
    });
  }

  public closeConversation(conversationId: string) {
    this.conversation.closeConversation();
    this.conversation.unSubscribeToMessageNotifications();
    this.conversation.isConvStarted = false;
    this.conversationEventSubject.next(new ConversationEvent(conversationId, ConvEvent.CLOSE));
  }

  public sendMessage(message:string, conversationId: string) {
    if(this.conversation.isConvStarted) {
      this.conversation.sendMessage(message).then(function () {
        this.conversationEventSubject.next(new ConversationEvent(conversationId, ConvEvent.MESSAGE_SENT));
      }.bind(this));
    }else{
      let msg = "A Conversation has to be intialized before sende a message";
      this.errorResponse(msg);
      console.error(msg);
    }
  }

  public reset(){
    if(this.conversation && this.conversation.isConvStarted) {
      this.conversation.closeConversation();
      this.conversation.unSubscribeToMessageNotifications();
    }
    this.conversation = null;
    this.conversationEventSubject.next(new ConversationEvent("", ConvEvent.RESET));
  }

}
