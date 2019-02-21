import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Subject, throwError} from "rxjs";
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
    }
  };

  public sendFile(file: any, message: string) {
    const fileType = this.getFileTypeFromSupportedTypes(file.type);
    if(fileType) {
        this.conversationManager.sendUploadUrlRequest(file.size, fileType, this.conversation).pipe(
          flatMap(responseBody => {
            return this.conversationManager.uploadFileRequest(
              file,
              responseBody.body.relativePath,
              responseBody.body.queryParams.temp_url_sig,
              responseBody.body.queryParams.temp_url_expires,
              this.conversation).pipe(
              map(() => {
                this.successResponse("File was successfully uploaded in the server");
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  const prview = reader.result;
                  this.conversationManager.sendMessageWithImage(prview, fileType, responseBody.body.relativePath, message ? message : file.name, this.conversation).pipe(
                    map(() => {
                      this.successResponse("Message with file was successfully sent");
                    })
                  ).subscribe();
                }
              }),
            )
          }),
          catchError((error: any) => {
            this.loadingService.stopLoading();
            this.errorResponse(error);
            return throwError(new Error(error || 'An error occurred, please try again later'));
          })
        ).subscribe();

    }
  }

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
      if(message.type === MessageType.RECEIVED && !message.read )  {
        message.read = true;
        lastReadSequenceList.push(message.sequence);
      }
    });
    return lastReadSequenceList;
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


}
