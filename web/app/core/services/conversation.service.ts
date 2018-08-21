import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "./send-api.service";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";
import {ConversationEvent, ConvEvent} from "../../shared/models/conversation/conversationEvent.model";
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {Router} from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {ConversationManager} from "../helpers/conversation-manager";
import {StateManager} from "../helpers/state-manager";

@Injectable()
export class ConversationService extends HttpService {

  public conversationEventSubject = new Subject<ConversationEvent>();
  public conversation: Conversation;

  constructor(protected snackBar: MatSnackBar,
              protected conversationManager: ConversationManager,
              protected http: HttpClient,
              protected loadingService: LoadingService,
              protected router: Router,
              protected stateManager: StateManager) {
    super(snackBar, http, loadingService, router);
  }

  public openConversation(brandId: string, appKey: string, appSecret, userName: string, initialMessage: string) {
    this.conversation = new Conversation(brandId, appKey, appSecret, userName);
    this.conversationManager.openConversation(this.conversation).subscribe(res => {
      this.successResponse("Conversation OPEN successfully with id " + this.conversation.conversationId);
      this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.OPEN));
      this.sendMessage(initialMessage);
    }, error => {
      this.errorResponse(error);
    });
  }

  public sendMessage(message: string) {
    if (this.conversation.isConvStarted) {
      this.conversationManager.sendMessage(message, this.conversation).subscribe(res => {
        console.log(res);
        this.successResponse("Message successfully sent to conversation with id " + this.conversation.conversationId);
        this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.MESSAGE_SENT));
        this.stateManager.storeLastConversationInLocalStorage(this.conversation);
      }, error => {
        this.loadingService.stopLoading();
        this.handleError(error);
      });
    } else {
      const msg = "A Conversation has to be intialized before send a message";
      this.errorResponse(msg);
      console.error(msg);
    }
  };

  public closeConversation() {
    this.conversationManager.closeConversation(this.conversation).subscribe(res => {
      this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.CLOSE));
      this.successResponse("Conversation CLOSED successfully with id " + this.conversation.conversationId);
      this.stateManager.storeLastConversationInLocalStorage(this.conversation);
    }, error => {
      this.errorResponse(error);
    });
  }

  public getBackPreviousConversationByBrand(brandId: string): Conversation {
    let conversation = this.stateManager.getLastStoredConversationByBrand(brandId);
    if(conversation){
      this.conversation = conversation;
    }
    return conversation;
  }

  public reset() {
    if (this.conversation && this.conversation.isConvStarted) {
      this.closeConversation();
    }
    this.conversationEventSubject.next(new ConversationEvent("", ConvEvent.RESET));
  }

}
