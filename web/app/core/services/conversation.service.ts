import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";
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
import {AuthenticationService} from "./authentication.service";
import {ChatState} from "../../shared/models/send-api/EventChatState.model";
import {Status} from "../../shared/models/send-api/EventAcceptStatus.model";
import {MessageType} from "../../shared/models/conversation/chatMessage.model";
import {HistoryService} from "./history.service";

@Injectable()
export class ConversationService extends HttpService {

  public conversationEventSubject = new Subject<ConversationEvent>();
  public conversation: Conversation;
  public brandId: string;

  constructor(protected snackBar: MatSnackBar,
              protected conversationManager: ConversationManager,
              protected http: HttpClient,
              protected loadingService: LoadingService,
              protected router: Router,
              protected authenticationService: AuthenticationService,
              protected stateManager: StateManager,
              protected historyService: HistoryService) {
    super(snackBar, http, loadingService, router);
  }

  public init() {
    this.brandId = this.authenticationService.user.brandId;

    this.historyService.init();

    this.restoreStoredState();

    this.conversationManager.conversationEventSubject.subscribe( (event: ConversationEvent) => {
      if(event.event === ConvEvent.EVENT_RECEIVED ) {
        this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId,ConvEvent.EVENT_RECEIVED));
      } else if(event.event === ConvEvent.MSG_RECEIVED ) {
        this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId,ConvEvent.MSG_RECEIVED));

        this.notifyMessageWasAccepted(this.conversation.messages[this.conversation.messages.length-1].sequence);
      }
    });
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
        this.successResponse("Message successfully SENT to conversation with id " + this.conversation.conversationId);
        this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.MESSAGE_SENT));
      }, error => {
        this.loadingService.stopLoading();
        this.errorResponse(error);
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
    }, error => {
      this.errorResponse(error);
    });
  }

  public reset() {
    if (this.conversation && this.conversation.isConvStarted) {
      // this.closeConversation();
      this.conversation = null;
    }
    this.conversationEventSubject.next(new ConversationEvent("", ConvEvent.RESET));
  }

  private restoreStoredState() {
    let appState = this.stateManager.getLastStoredStateByBrand(this.brandId);
    if(appState.lastConversation){
      this.conversation = appState.lastConversation;
      this.conversationManager.authenticate(this.conversation).subscribe(res => {
        this.successResponse("Conversation authentication successfully");
        this.conversationManager.subscribeToMessageNotifications(this.conversation);
        //this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.OPEN));

        if(this.conversation.consumerId){
          this.historyService.getHistoryByConsumerId(this.conversation.consumerId);
        }
      }, error => {
        this.errorResponse(error);
      });
    }
  }

  public notifyAgentConsumerIsInTheChat() {
    this.deactivateLoadingService();
    this.conversationManager.sendChatStateEventRequest(this.conversation, ChatState.ACTIVE).subscribe(res => {
      this.activateLoadingService();
    },error => {
      this.errorResponse(error);

    });
  }

  public notifyAgentConsumerIsNotInTheChat() {
    this.deactivateLoadingService();
    this.conversationManager.sendChatStateEventRequest(this.conversation, ChatState.GONE).subscribe(res => {
      this.activateLoadingService();
    },error => {
      this.errorResponse(error);

    });
  }

  public notifyAgentThatUserIsTyping() {
    this.deactivateLoadingService();
    this.conversationManager.sendChatStateEventRequest(this.conversation, ChatState.COMPOSING).subscribe(res => {
      this.activateLoadingService();
    },error => {
      this.errorResponse(error);
    });
  }

  public notifyAgentThatUserStopsTyping() {
    this.deactivateLoadingService();
    this.conversationManager.sendChatStateEventRequest(this.conversation, ChatState.PAUSE).subscribe(res => {
      this.activateLoadingService();
    },error => {
      this.errorResponse(error);
    });
  }

  public notifyMessagesWasRead() {
    let sequenceList = this.getLastReadMessages();
    if(sequenceList.length > 0) {
      this.deactivateLoadingService();
      this.conversationManager.sendEventAcceptStatusRequest(this.conversation, Status.READ, sequenceList).subscribe(res => {
        this.activateLoadingService();
      },error => {
        this.errorResponse(error);
      });
    }
  }

  public notifyMessageWasAccepted(sequence: number) {
    let sequenceList = [sequence];
    if(sequenceList.length > 0) {
      this.deactivateLoadingService();
      this.conversationManager.sendEventAcceptStatusRequest(this.conversation, Status.ACCEPT, sequenceList).subscribe(res => {
        this.activateLoadingService();
      },error => {
        this.errorResponse(error);
      });
    }
  }

  private getLastReadMessages(): Array<number> {
    let lastReadSequenceList = [];
    this.conversation.messages.forEach(message => {
      if(message.type === MessageType.RECEIVED && !message.read ){
        message.read = true;
        lastReadSequenceList.push(message.sequence);
      }
    });
    return lastReadSequenceList;
  }

}
