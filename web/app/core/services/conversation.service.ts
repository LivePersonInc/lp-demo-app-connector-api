import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "./send-api.service";
import {LoadingService} from "./loading.service";
import {HttpService} from "./http.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ConversationEvent, ConvEvent} from "../../shared/models/conversation/conversationEvent.model";
import {Conversation} from "../../shared/models/conversation/conversation";
import {EventSourcePolyfill} from 'ng-event-source';
import {Router} from "@angular/router";
import {ChatMessage} from "../../shared/models/conversation/chatMessage.model";
import {CampaignInfo} from "../../shared/models/send-api/CampaignInfo.model";
import {ConsumerRequestConversation} from "../../shared/models/send-api/ConsumerRequestConversation.model";
import {PushNotificationData} from "../../shared/models/send-api/PushNotificationData.model";
import {PrivateData} from "../../shared/models/send-api/PrivateData.model";
import {SetUserProfile} from "../../shared/models/send-api/SetUserProfile.model";
import {Request} from "../../shared/models/send-api/Request.model";
import {Event} from "../../shared/models/send-api/Event.model";
import {PublishContentEvent} from "../../shared/models/send-api/PublishContentEvent.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ConversationService extends HttpService {

  public conversationEventSubject = new Subject<ConversationEvent>();
  public conversation: Conversation;

  //public conversationList; // Hash table of Conversation accesed by convID

  constructor(protected snackBar: MatSnackBar,
              protected http: HttpClient,
              protected loadingService: LoadingService,
              protected sendApiService: SendApiService,
              protected router: Router,) {
    super(snackBar, http, loadingService, router);
  }

  public openConversation(brandId: string, appKey: string, appSecret, userName: string, initialMessage: string) {
    this.conversation = new Conversation(brandId, appKey, appSecret, userName);
    this.getAppJWT(brandId, appKey, appSecret)
      .flatMap((res: any) => {
        this.conversation.appJWT = res['access_token'];
        return this.getConsumerJWS()
          .flatMap((res: any) => {
            this.conversation.consumerJWS = res['token'];
            return this.openConversationRequest(initialMessage).map((res: any) => {
              this.conversation.conversationId = res["convId"];
              this.conversation.isConvStarted = true;
              this.subscribeToMessageNotifications(this.conversation);
              this.successResponse("Conversation OPEN successfully with id " + this.conversation.conversationId);
              this.conversation.messages.push(new ChatMessage("sent", new Date, initialMessage, this.conversation.userName, "ok", this.getShowUserValue(this.conversation.userName)));
              this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.OPEN));
              this.loadingService.stopLoading();
            });
          })
      }).subscribe(res => {
      console.log(res);
      console.log("Conversation Opened");
    }, error => {
      this.errorResponse(error);
    });
  }


  public sendMessage(message: string) {
    if (this.conversation.isConvStarted) {
      this.sendMessageRequest(message).subscribe(res => {
        console.log(res);
        this.conversation.messages.push(new ChatMessage("sent", new Date, message, this.conversation.userName, "ok", this.getShowUserValue(this.conversation.userName)));
        this.successResponse("Message successfully sent to conversation with id " + this.conversation.conversationId);
        this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.MESSAGE_SENT));
      }, error => {
        this.loadingService.stopLoading();
        this.handleError(error);
      });
    } else {
      const msg = "A Conversation has to be intialized before sende a message";
      this.errorResponse(msg);
      console.error(msg);
    }
  }

  public closeConversation() {
    const headers = {
      'headers': {
        'content-type': 'application/json',
        'Authorization': this.conversation.appJWT,
        'x-lp-on-behalf': this.conversation.consumerJWS
      }
    };
    this.sendApiService.closeConversation(this.conversation.branId, this.conversation.conversationId, headers).subscribe(res => {
      this.unSubscribeToMessageNotifications(this.conversation);
      this.conversation.isConvStarted = false;
      this.conversationEventSubject.next(new ConversationEvent(this.conversation.conversationId, ConvEvent.CLOSE));
      this.successResponse("Conversation CLOSED successfully with id " + this.conversation.conversationId);
    }, error => {
      this.errorResponse(error);
    });
  }

  public reset() {
    if (this.conversation && this.conversation.isConvStarted) {
      this.closeConversation();
      this.unSubscribeToMessageNotifications(this.conversation);
    }
    this.conversation = null;
    this.conversationEventSubject.next(new ConversationEvent("", ConvEvent.RESET));
  }

  private handleIncomingNotifications(notification) {
    let data = JSON.parse(notification.data);
    this.conversation.serverNotifications.push(JSON.stringify(data, null, " "));

    try {
      if (data.body.changes[0].originatorMetadata &&
        data.body.changes[0].originatorMetadata.role === "ASSIGNED_AGENT") {
        console.log(data);
        if (data.body.changes[0].event.message) {
          this.conversation.messages.push(
            new ChatMessage(
              "received",
              data.body.changes[0].serverTimestamp,
              data.body.changes[0].event.message,
              "AGENT",
              "ok",
              false
            )
          );
        }
      }
    } catch (error) {
      console.error("ERROR parsing notification", error);
    }
    console.log("Notification in conv manager");
    console.log(notification);
  }

  private getAppJWT(brandId: string, appKey: string, appSecret: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.sendApiService.getAppJWT(brandId, appKey, appSecret, httpOptions);
  }

  private getConsumerJWS(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': this.conversation.appJWT
      })
    };
    const body = {"ext_consumer_id": this.conversation.ext_consumer_id};
    return this.sendApiService.getConsumerJWS(this.conversation.branId, body, httpOptions);
  }

  private sendMessageRequest(message: string): Observable<any> {
    const headers = {
      'headers': {
        'content-type': 'application/json',
        'Authorization': this.conversation.appJWT,
        'x-lp-on-behalf': this.conversation.consumerJWS
      }
    };
    const body = JSON.stringify(this.getMessageRequestBody(message));
    return this.sendApiService.sendMessage(this.conversation.branId, this.conversation.conversationId, body, headers);
  };

  private openConversationRequest(initialMessage: string): Observable<any> {
    const headers = {
      'headers': {
        'content-type': 'application/json',
        'Authorization': this.conversation.appJWT,
        'x-lp-on-behalf': this.conversation.consumerJWS
      }
    };
    const body = JSON.stringify(this.getOpenConvRequestBody(initialMessage, this.conversation.userName));
    return this.sendApiService.openConversation(this.conversation.branId, body, headers);
  }

  private getOpenConvRequestBody(initialMessage: string, userName: string): any {
    let body = [];
    let campaignInfo = new CampaignInfo("99999", "888888");
    let requestBody = new ConsumerRequestConversation(
      "CUSTOM",
      campaignInfo,
      "MESSAGING",
      this.conversation.branId,
      "-1"
    );
    this.conversation.requestConversationPayload = new Request("req", "1,", "cm.ConsumerRequestConversation", requestBody);


    let pushNotificationData = new PushNotificationData("Service", "CertName", "TOKEN");
    let privateData = new PrivateData("1750345346", "test@email.com", pushNotificationData);
    let setUserProfileBody = new SetUserProfile(
      userName || "WEB UI USER",
      "Test",
      "http://avatarurl.com",
      "consumer",
      "http://something.com",
      "Test Description",
      privateData
    );
    this.conversation.setUserProfilePayload = new Request("req", "2,", "userprofile.SetUserProfile", setUserProfileBody);

    let event = new Event("ContentEvent", "text/plain", initialMessage);
    let publishContentEvent = new PublishContentEvent(this.conversation.conversationId, event);
    this.conversation.sendMsgPayload = new Request("req", "3", "ms.PublishEvent", publishContentEvent);


    return body = [this.conversation.setUserProfilePayload, this.conversation.requestConversationPayload, this.conversation.sendMsgPayload];
  }

  private getMessageRequestBody(message: string) {
    return new Request("req", "3", "ms.PublishEvent", new PublishContentEvent(this.conversation.conversationId,
      new Event("ContentEvent", "text/plain", message)));
  }

  private getShowUserValue(userName: string): boolean {
    return this.conversation.messages && (this.conversation.messages.length === 0 || this.conversation.messages[this.conversation.messages.length - 1].userName !== userName);
  }

  private subscribeToMessageNotifications(conversation: Conversation) {
    conversation.eventSource = new EventSourcePolyfill(`http://${environment.server}:${environment.server_port}/notifications/subscribe/${conversation.conversationId}`, {});

    conversation.eventSource.onmessage = (notification => {
      this.handleIncomingNotifications(notification);
    });
    conversation.eventSource.onopen = (a) => {
      console.log("OPEN");
    };
    conversation.eventSource.onerror = (e) => {
      console.log(e);

    }
  }

  private unSubscribeToMessageNotifications(conversation: Conversation) {
    if (conversation.eventSource instanceof EventSourcePolyfill) {
      conversation.eventSource.close();
    } else {
      console.log("Error: There is not any instance of EventSourcePolyfill");
    }
  }

}
