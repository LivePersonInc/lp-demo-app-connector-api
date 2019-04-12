import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {mergeMap, map, catchError, flatMap} from "rxjs/operators";
import {ConversationEvent, ConvEvent} from "../../shared/models/conversation/conversationEvent.model";
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {Router} from "@angular/router";
import {ConversationManager} from "../util/conversation-manager";
import {StateStorage} from "../util/state-storage";
import {AuthenticationService} from "./authentication.service";
import {ChatState} from "../../shared/models/send-api/EventChatState.model";
import {Status} from "../../shared/models/send-api/EventAcceptStatus.model";
import {MessageType} from "../../shared/models/conversation/chatMessage.model";
import {HistoryService} from "./history.service";
import {InstallationService} from "./istallation.service";
import {Options} from "../../shared/models/conversation/options.model";
import {FileMessage} from "../../shared/models/conversation/fileMessage.model";
import {DomainsService} from "./domains.service";

@Injectable()
export class ConversationService extends HttpService {

  public conversationEventSubject = new Subject<ConversationEvent>();
  public conversationRestoredSubject = new Subject<string>();

  public conversation: Conversation;
  public brandId: string;

  constructor(protected snackBar: MatSnackBar,
              protected conversationManager: ConversationManager,
              protected http: HttpClient,
              protected loadingService: LoadingService,
              protected router: Router,
              protected authenticationService: AuthenticationService,
              protected stateManager: StateStorage,
              protected installationService: InstallationService,
              protected domainsService: DomainsService,
              protected historyService: HistoryService) {
    super(snackBar, http, loadingService, router);
  }

  public init() {
    if(this.authenticationService && this.authenticationService.user) {
      this.brandId = this.authenticationService.user.brandId;

      this.historyService.init();

      this.historyService.historySubject.subscribe( event => {
        if(event === 'GET_CONV_HISTORY'){
          this.conversationManager.addHistoryMessageToCurrentState(this.conversation);
        }
      });

      this.installationService.installationSubject.subscribe( event => {
        if(event === 'APP_SECRET_FOUND') {
          this.restoreStoredState();
        }
      });

      this.conversationManager.conversationEventSubject.subscribe( (event: ConversationEvent) => {
        if(event.event === ConvEvent.EVENT_RECEIVED ) {
          this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId,ConvEvent.EVENT_RECEIVED));
        } else if(event.event === ConvEvent.MSG_RECEIVED ) {
          this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId,ConvEvent.MSG_RECEIVED));

          this.notifyMessageWasAccepted(this.conversation.messages[this.conversation.messages.length-1].sequence);
        }
      });
    }
  }

  public openConversation(brandId: string, appKey: string, appSecret, userName: string, initialMessage: string, options: Options) {
    this.conversation = new Conversation(brandId, appKey, appSecret, userName);

    this.conversation.context_name = options.context_name;
    this.conversation.skillId = options.skillId;
    this.conversation.engagementId = options.engagementId;
    this.conversation.campaignId = options.campaignId;
    this.conversation.features = options.features;

    this.conversationManager.openConversation(this.conversation).pipe(
      map(res => {
        this.successResponse("Conversation OPEN successfully with id " + this.conversation.conversationId);
        this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.OPEN));
        this.sendMessage(initialMessage);
      }),
      catchError(error => {
        this.errorResponse(error);
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe()
  }

  public sendMessage(message: string) {
    if (this.conversation.isConvStarted) {
      this.conversationManager.sendMessage(message, this.conversation).pipe(
        map(res => {
          this.successResponse("Message successfully SENT to conversation with id " + this.conversation.conversationId);
          this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.MESSAGE_SENT));
        }),
        catchError(error => {
          this.errorResponse(error);
          return throwError(new Error(error || 'An error occurred, please try again later'));
        })
      ).subscribe()
    } else {
      this.errorResponse("A Conversation has to be intialized before send a message");
    }
  };

  public sendFile(file: any, message: string) {
    const fileType = this.getFileTypeFromSupportedTypes(file.type);
    if(fileType) {
      this.conversationManager.sendUploadUrlRequest(file.size, fileType, this.conversation).pipe(
          flatMap(r => {
            return this.conversationManager.uploadFileRequest(file, r.body.relativePath, r.body.queryParams.temp_url_sig, r.body.queryParams.temp_url_expires).pipe(
              flatMap(() => {
                return this.conversationManager.sendMessageWithImage(file, fileType, r.body.relativePath, message ? message : file.name, file.name, this.conversation).pipe(
                  map(() => {
                    this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.MESSAGE_SENT));
                    this.successResponse("Message with file was successfully sent");
                  }));
              }),
            )
          }),
          catchError((error: any) => {
            this.errorResponse(error);
            return throwError(new Error(error || 'An error occurred, please try again later'));
          })
        ).subscribe();
    }else{
      this.errorResponse("File type not supported, ony the types JPG, PNG, JPEG, PNG and GIF supported");
    }
  }

  public downloadFile(file: FileMessage) {
    if(file){
      this.conversationManager.getDownloadUrl(file.relativePath, this.conversation).pipe(
        map(r => {
          this.successResponse("Download URL was successfully requested");
          window.open(`https://${this.domainsService.getDomainByServiceName('swift')}${r.body.relativePath}?temp_url_sig=${r.body.queryParams.temp_url_sig}&temp_url_expires=${r.body.queryParams.temp_url_expires}`);
        }),
        catchError((error: any) => {
          this.errorResponse(error);
          return throwError(new Error(error || 'An error occurred, please try again later'));
      })
      ).subscribe();
    }
  }

  public closeConversation() {
    this.conversationManager.closeConversation(this.conversation).pipe(
      map(res => {
        this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.CLOSE));
        this.successResponse("Conversation CLOSED successfully with id " + this.conversation.conversationId);
      }),
      catchError(error => {
        this.errorResponse(error);
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe();
  }

  //TODO: Seb - new closeConversation method that also triggers PCS
  public closeConversationWithPCS() {
    this.conversationManager.closeConversationWithPCS(this.conversation).pipe(
      map(res => {
       this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.CLOSE));
       this.successResponse("Conversation CLOSED successfully with id " + this.conversation.conversationId);
      }),
      catchError(error => {
        this.errorResponse(error);
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe();
  }

  public reset() {
    if (this.conversation && this.conversation.isConvStarted) {
      // this.closeConversation();
      this.conversation = null;
    }
    this.conversationEventSubject.next(new ConversationEvent("", ConvEvent.RESET));
  }

  public notifyAgentConsumerIsInTheChat() {
    this.notifyAgentConsumerChatState(ChatState.ACTIVE);
  }

  public notifyAgentConsumerIsNotInTheChat() {
    this.notifyAgentConsumerChatState(ChatState.GONE);
  }

  public notifyAgentThatUserIsTyping() {
    this.notifyAgentConsumerChatState(ChatState.COMPOSING);
  }

  public notifyAgentThatUserStopsTyping() {
    this.notifyAgentConsumerChatState(ChatState.PAUSE);
  }


  public notifyMessagesWasRead() {
    let sequenceList = this.getLastReadMessages();
    if(sequenceList.length > 0) {
      this.notifyMessageStatus(Status.READ, sequenceList);
    }
  }

  public notifyMessageWasAccepted(sequence: number) {
    let sequenceList = [sequence];
    if(sequenceList.length > 0) {
      this.notifyMessageStatus(Status.ACCEPT, sequenceList);
    }
  }

  //TODO: Seb - if postSurvey is running, don't send those notifications to the agent...
  //It does stop the 400 errors, but not instantly
  private notifyAgentConsumerChatState(chatState: ChatState) {

    if(this.conversationManager.getIsPostSurveyOpen()) {
      return;
    }

    this.deactivateLoadingService();
    this.conversationManager.sendChatStateEventRequest(this.conversation, chatState).pipe(
      map(res => {
        this.activateLoadingService();
      }),
      catchError(error => {
        this.errorResponse(error);
        return throwError(new Error(error || 'An error occurred, please try again later'));
      })
    ).subscribe();
  }

    private notifyMessageStatus(status: Status, sequenceList){
      this.deactivateLoadingService();
      this.conversationManager.sendEventAcceptStatusRequest(this.conversation, status, sequenceList).pipe(
        map(res => {
          this.activateLoadingService();
        }),
        catchError(error => {
          this.errorResponse(error);
          return throwError(new Error(error || 'An error occurred, please try again later'));
        })
      ).subscribe();
  }

  private getLastReadMessages(): Array<number> {
    let lastReadSequenceList = [];
    this.conversation.messages.forEach(message => {
      if(message.type === MessageType.RECEIVED && !message.read )  {
        message.read = true;
        lastReadSequenceList.push(message.sequence);
      }
    });
    return lastReadSequenceList;
  }

  private getFileTypeFromSupportedTypes(fileType:string):string {
    const supportedFiles = ["PNG","JPEG","JPG","GIF"];
    if(fileType) {
      const type = fileType.toLocaleUpperCase().split("/")[1];
      if(supportedFiles.filter(t => t === type).length){
        return type;
      }
    }
    return "";
  }

  public restoreStoredState() {
    let state = this.stateManager.getLastStoredStateByBrand(this.brandId);
    if(state.selectedAppId){
      let appState = this.conversationManager.fidAppById(state.states, state.selectedAppId);
      if(appState) {
        this.conversation =
          new Conversation(this.brandId, this.installationService.selectedApp.client_id, this.installationService.selectedApp.client_secret, appState.userName);
        this.conversation.conversationId = appState.conversationId;
        this.conversation.ext_consumer_id = appState.ext_consumer_id;
        this.conversation.userName = appState.userName;

        this.conversationManager.authenticate(this.conversation).subscribe(res => {
          this.successResponse("Conversation authentication successfully");
          this.conversationManager.subscribeToMessageNotifications(this.conversation);
          if(this.conversation.conversationId){
            this.historyService.getHistoryByConsumerId(this.conversation.conversationId);
            this.conversationRestoredSubject.next("RESTORED");

          }
        }, error => {
          this.errorResponse(error);
        });
      }
    }
  }

}
