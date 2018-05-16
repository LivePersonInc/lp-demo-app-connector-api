import {Injectable} from '@angular/core';
import {SendApiService} from "../services/send-api.service";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Conversation} from "../../shared/models/conversation/conversation.model";
import {EventSourcePolyfill} from 'ng-event-source';
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
export class ConversationManager {

  constructor(private sendApiService:SendApiService){}

  public openConversation(conversation: Conversation, initialMessage: string): Observable<any> {
    return this.getAppJWT(conversation)
      .flatMap((res: any) => {
        conversation.appJWT = res['access_token'];
        return this.getConsumerJWS(conversation)
          .flatMap((res: any) => {
            conversation.consumerJWS = res['token'];
            return this.openConversationRequest(initialMessage, conversation).map((res: any) => {
              conversation.conversationId = res["convId"];
              conversation.isConvStarted = true;
              this.subscribeToMessageNotifications(conversation);
              conversation.messages.push(new ChatMessage("sent", new Date, initialMessage, conversation.userName, "ok", this.getShowUserValue(conversation.userName, conversation)));
              //conversation.messages.push(new ChatMessage("sent", new Date, initialMessage, conversation.userName, "ok", false));
            });
          })
      });
  }

  public sendMessage(message: string, conversation: Conversation): Observable<any> {
      return this.sendMessageRequest(message, conversation).map(res => {
        console.log(res);
        conversation.messages.push(new ChatMessage("sent", new Date, message, conversation.userName, "ok", this.getShowUserValue(conversation.userName, conversation)));
      });
  }

  public closeConversation(conversation: Conversation): Observable<any> {
    const headers = {
      'headers': {
        'content-type': 'application/json',
        'Authorization': conversation.appJWT,
        'x-lp-on-behalf': conversation.consumerJWS
      }
    };
    return this.sendApiService.closeConversation(conversation.branId, conversation.conversationId, headers).map(res => {
      this.unSubscribeToMessageNotifications(conversation);
      conversation.isConvStarted = false;
    });

  }

  public subscribeToMessageNotifications(conversation: Conversation) {
    conversation.eventSource = new EventSourcePolyfill(`http://${environment.server}:${environment.server_port}/notifications/subscribe/${conversation.conversationId}`, {});

    conversation.eventSource.onmessage = (notification => {
      this.handleIncomingNotifications(notification, conversation);
    });
    conversation.eventSource.onopen = (a) => {
      console.log("OPEN");
    };
    conversation.eventSource.onerror = (e) => {
      console.log(e);

    }
  }

  public unSubscribeToMessageNotifications(conversation: Conversation) {
    if (conversation.eventSource instanceof EventSourcePolyfill) {
      conversation.eventSource.close();
    } else {
      console.log("Error: There is not any instance of EventSourcePolyfill");
    }
  }


  private getAppJWT(conversation: Conversation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this.sendApiService.getAppJWT(conversation.branId, conversation.appKey, conversation.appSecret, httpOptions);
  }

  private getConsumerJWS(conversation: Conversation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': conversation.appJWT
      })
    };
    const body = {"ext_consumer_id": conversation.ext_consumer_id};
    return this.sendApiService.getConsumerJWS(conversation.branId, body, httpOptions);
  }

  private sendMessageRequest(message: string, conversation: Conversation): Observable<any> {
    const headers = {
      'headers': {
        'content-type': 'application/json',
        'Authorization': conversation.appJWT,
        'x-lp-on-behalf': conversation.consumerJWS
      }
    };
    const body = JSON.stringify(this.getMessageRequestBody(message,conversation));
    return this.sendApiService.sendMessage(conversation.branId, conversation.conversationId, body, headers);
  };

  private openConversationRequest(initialMessage: string, conversation: Conversation): Observable<any> {
    const headers = {
      'headers': {
        'content-type': 'application/json',
        'Authorization': conversation.appJWT,
        'x-lp-on-behalf': conversation.consumerJWS
      }
    };
    const body = JSON.stringify(this.getOpenConvRequestBody(initialMessage, conversation.userName, conversation));
    return this.sendApiService.openConversation(conversation.branId, body, headers);
  }

  private handleIncomingNotifications(notification, conversation: Conversation) {
    let data = JSON.parse(notification.data);
    conversation.serverNotifications.push(JSON.stringify(data, null, " "));

    try {
      if (data.body.changes[0].originatorMetadata &&
        data.body.changes[0].originatorMetadata.role === "ASSIGNED_AGENT") {
        console.log(data);
        if (data.body.changes[0].event.message) {
          conversation.messages.push(
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

  private getMessageRequestBody(message: string, conversation: Conversation) {
    return new Request("req", "3", "ms.PublishEvent", new PublishContentEvent(conversation.conversationId,
      new Event("ContentEvent", "text/plain", message)));
  }

  private getShowUserValue(userName: string, conversation: Conversation): boolean {
    //TODO: DOes not show the angen maybe it should be removed
    return conversation.messages && (conversation.messages.length === 0 || conversation.messages[conversation.messages.length - 1].userName !== userName);
  }

  private getOpenConvRequestBody(initialMessage: string, userName: string, conversation: Conversation): any {
    let body = [];
    let campaignInfo = new CampaignInfo("99999", "888888");
    let requestBody = new ConsumerRequestConversation(
      "CUSTOM",
      campaignInfo,
      "MESSAGING",
      conversation.branId,
      "-1"
    );
    conversation.requestConversationPayload = new Request("req", "1,", "cm.ConsumerRequestConversation", requestBody);


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
    conversation.setUserProfilePayload = new Request("req", "2,", "userprofile.SetUserProfile", setUserProfileBody);

    let event = new Event("ContentEvent", "text/plain", initialMessage);
    let publishContentEvent = new PublishContentEvent(conversation.conversationId, event);
    conversation.sendMsgPayload = new Request("req", "3", "ms.PublishEvent", publishContentEvent);


    return body = [conversation.setUserProfilePayload, conversation.requestConversationPayload, conversation.sendMsgPayload];
  }



}
