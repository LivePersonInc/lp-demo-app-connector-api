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

@Injectable()
export class ConversationService extends HttpService{

  public  conversationEventSubject = new Subject<ConversationEvent>();
  private conversationList; // Hash table of Conversation accesed by convID

  constructor(protected snackBar: MatSnackBar,protected http: HttpClient, protected loadingService:LoadingService, protected  sendApiService: SendApiService){
    super(snackBar,http, loadingService);
    this.conversationList = [];

  }

  public openConversation(userName: string, brandId: string, appKey: string, appSecret,initialMessage: string): Conversation {

    let conversation: Conversation = new Conversation(this.snackBar, this.sendApiService, brandId, appKey, appSecret, userName, this.loadingService);
    conversation.getAppJWT().then(resolve => {
      conversation.getAppConsumerJWS().then(resolve => {
        conversation.openConversation(initialMessage).then(conversationId => {
          conversation.isConvStarted = true;
          conversation.subscribeToMessageNotifications(conversationId);
          this.conversationList[conversationId] = conversation;
          this.conversationEventSubject.next(new ConversationEvent(conversationId, ConvEvent.OPEN));
        });
      });
    });
    //returns reference
    return conversation;
  }

  public closeConversation(conversationId: string) {
    this.conversationList[conversationId].closeConversation();
    this.conversationList[conversationId].unsubscribeToMessageNotifications();
    this.conversationList[conversationId].isConvStarted = false;
  }

  public sendMessage(message:string, conversationId: string) {
    if(this.conversationList[conversationId].isConvStarted) {
      this.conversationList[conversationId].sendMessage(message).then(function () {
        this.conversationEventSubject.next(new ConversationEvent(conversationId, ConvEvent.MESSAGE_SENT));
      }.bind(this));
    }else{
      let msg = "A Conversation hast to be intialized before sende a message";
      this.errorResponse(msg);
      console.error(msg);
    }
  }





}
