import {SendApiService} from "../../../core/services/send-api.service";
import {environment} from '../../../../environments/environment';
import {HttpHeaders} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {ConsumerRequestConversation} from "../send-api/ConsumerRequestConversation.model";
import {CampaignInfo} from "../send-api/CampaignInfo.model";
import {Request} from "../send-api/Request.model";
import {PushNotificationData} from "../send-api/PushNotificationData.model";
import {PrivateData} from "../send-api/PrivateData.model";
import {SetUserProfile} from "../send-api/SetUserProfile.model";
import {Event} from "../send-api/Event.model";
import {PublishContentEvent} from "../send-api/PublishContentEvent.model";
import {ChatMessage} from "./chatMessage.model";
import {LoadingService} from "../../../core/services/loading.service";
import {EventSourcePolyfill} from 'ng-event-source';


export class Conversation {
  public isConvStarted: boolean;
  public isLoading = false;
  public appJWT: string;
  public consumerJWS: string;
  public branId: string;
  public appKey: string;
  public appSecret: string;
  public ext_consumer_id: string;
  public conversationId: string;
  public requestConversationPayload: Request;
  public setUserProfilePayload:Request;
  public sendMsgPayload:Request;
  public message: String;
  public userName;
  public eventSource: EventSourcePolyfill;
  public snackBarConfing : MatSnackBarConfig;
  public messages: Array<ChatMessage>;
  public serverNotifications: Array<string>;

  private subscription: Subscription;

  constructor( public snackBar: MatSnackBar,public sendApiService: SendApiService, brandId:string, appKey: string, appSecret: string,  userName: string, public losadingSerive: LoadingService) {
    this.branId = brandId;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.userName = userName;
    this.messages = [];
    this.serverNotifications = [];

    this.snackBarConfing = new MatSnackBarConfig();
    this.snackBarConfing.verticalPosition = 'top';
    this.snackBarConfing.horizontalPosition = 'right';

    this.ext_consumer_id = "ramdom_id" + Math.random();
    this.message = "Default message";

    this.subscription = this.losadingSerive.isLoadingSubscription().subscribe( isLoading => {
      this.isLoading = isLoading;
    }, error => {
      console.log('SUBSCRIPTION ERROR: ' + error);
    });
  }

  public handleIncomingNotifications(notification) {
    let data = JSON.parse(notification.data);
    this.serverNotifications.push(JSON.stringify(data, null, " "));

    try{
      if(data.body.changes[0].originatorMetadata &&
        data.body.changes[0].originatorMetadata.role === "ASSIGNED_AGENT"){
        console.log( data );
        if(data.body.changes[0].event.message) {
          this.messages.push(
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
    }catch(error) {
      console.error("ERROR parsing notification", error);
    }
    console.log("Notification in conv manager");
    console.log(notification);

  }

  public getAppJWT(): Promise<string> {
    return new Promise( (resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type':'application/x-www-form-urlencoded'
        })
      };

      this.sendApiService.getAppJWT(this.branId,this.appKey,this.appSecret,httpOptions).subscribe(
        res =>{
          console.log(res);
          this.handleSuccess("App JWT succesfully obtined");
          this.appJWT = res['access_token'];
          resolve(res['access_token']);
        },  error => {
          this.handleError(error);
          reject(error);
          this.losadingSerive.stopLoading();
        }
      );
    })

  }

  public getAppConsumerJWS(): Promise<string> {
    return new Promise( (resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': this.appJWT
        })
      };
      console.log(httpOptions.headers);
      const body = {"ext_consumer_id": this.ext_consumer_id};
      this.sendApiService.getConsumerJWS(this.branId, body, httpOptions).subscribe(
        res =>{
          console.log(res);
          this.consumerJWS = res['token'];
          resolve(res['token']);
          this.handleSuccess("Consumer JWS succesfully obtined");
        },  error => {
          this.handleError(error);
          reject(error);
          this.losadingSerive.stopLoading();
        }
      );
    })
  }

  public openConversation(initialMessage:string): Promise<any> {
    return new Promise( (resolve, reject) => {
      const headers = {
        'headers': {
          'content-type': 'application/json',
          'Authorization': this.appJWT,
          'x-lp-on-behalf': this.consumerJWS
        }
      };
      let body = JSON.stringify(this.getOpenConvRequestBody(initialMessage, this.userName));
      this.sendApiService.openConversation(this.branId, body, headers).subscribe(res => {
        this.conversationId = res["convId"];
        this.handleSuccess("Conversation OPEN successfully with id " + this.conversationId);
        this.messages.push(new ChatMessage("sent", new Date, initialMessage, this.userName, "ok", this.getShowUserValue(this.userName)));
        resolve(this.conversationId);
      }, error => {
        this.losadingSerive.stopLoading();
        this.handleError(error);
        reject(error);
      });
    })
  }

  public sendMessage(message: string): Promise<Object> {
    return new Promise( (resolve, reject) => {
      const headers = {'headers': {
        'content-type':'application/json',
        'Authorization': this.appJWT,
        'x-lp-on-behalf':this.consumerJWS
        }
      };
      let body;
      body = JSON.stringify(this.getMessageRequestBody(message));
      this.sendApiService.sendMessage(this.branId,this.conversationId,body, headers).subscribe(res => {
        console.log(res);
        this.messages.push(new ChatMessage("sent", new Date, message, this.userName, "ok", this.getShowUserValue(this.userName)));
        resolve(res);
        this.handleSuccess("Message successfully sent to conversation with id " + this.conversationId);
      },error => {
        this.losadingSerive.stopLoading();
        this.handleError(error);
        reject(error);
      });
    })

  }

  public closeConversation(){
    const headers = {'headers': {
      'content-type':'application/json',
      'Authorization': this.appJWT,
      'x-lp-on-behalf':this.consumerJWS
    }
    };
    this.sendApiService.closeConversation(this.branId,this.conversationId, headers).subscribe(res => {
      this.handleSuccess("Conversation CLOSED successfully with id " + this.conversationId);
    }, error => {
      this.losadingSerive.stopLoading();
      this.handleError(error);
    });
  }

  private handleError(error) {
    this.losadingSerive.stopLoading();
    this.snackBarConfing.duration = null;
    this.snackBarConfing.panelClass = ['snack-error'];
    this.snackBar.open('[ERROR] Response code: ' + error, 'Close', this.snackBarConfing);
  }

  private handleSuccess(message) {
    this.losadingSerive.stopLoading();
    this.snackBarConfing.duration = 2000;
    this.snackBar.open('Request successfully sent: ' + message, null, this.snackBarConfing);
  }

  private getOpenConvRequestBody(initialMessage: string, userName: string): any {
    let body = [];
    let campaignInfo = new CampaignInfo("99999", "888888");
    let requestBody = new ConsumerRequestConversation(
      "CUSTOM",
      campaignInfo,
      "MESSAGING",
      this.branId,
      "-1"
    );
    this.requestConversationPayload = new Request("req", "1,", "cm.ConsumerRequestConversation", requestBody);


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
    this.setUserProfilePayload = new Request("req", "2,", "userprofile.SetUserProfile", setUserProfileBody);

    let event = new Event("ContentEvent", "text/plain", initialMessage);
    let publishContentEvent = new PublishContentEvent(this.conversationId, event);
    this.sendMsgPayload = new Request("req", "3", "ms.PublishEvent", publishContentEvent);


    return body = [this.setUserProfilePayload, this.requestConversationPayload, this.sendMsgPayload];
  }

  private getMessageRequestBody(message: string) {
    return new Request("req", "3", "ms.PublishEvent", new PublishContentEvent(this.conversationId,
      new Event("ContentEvent", "text/plain", message)));
  }

  private getShowUserValue(userName:string): boolean {
    return this.messages && (this.messages.length === 0 || this.messages[this.messages.length - 1].userName !== userName);
  }

  public subscribeToMessageNotifications(conversationId: string) {
    this.eventSource  = new EventSourcePolyfill(`http://${environment.server}/notifications/subscribe/${conversationId}`,{});

    this.eventSource.onmessage = (notification => {
      this.handleIncomingNotifications(notification);
      /*this.zone.run(() => {
        //console.log(notification);
      });*/
    });

    this.eventSource.onopen = (a) => {
      console.log("OPEN");
    };
    this.eventSource.onerror = (e) => {
      console.log(e);

    }
  }

  public unSubscribeToMessageNotifications() {
    if(this.eventSource instanceof EventSourcePolyfill) {
      this.eventSource.close();
    }else {
      console.log("Error: There is not any instance of EventSourcePolyfill");
    }
  }

}
