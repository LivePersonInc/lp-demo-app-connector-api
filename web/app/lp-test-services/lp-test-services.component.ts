import { Component, OnInit } from '@angular/core';
import {SendApiService} from "../core/services/send-api.service";
import {environment} from '../../environments/environment';
import {HttpHeaders} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {ConsumerRequestConversation} from "../shared/models/ConsumerRequestConversation";
import {CampaignInfo} from "../shared/models/CampaignInfo";
import {Request} from "../shared/models/Request";
import {PushNotificationData} from "../shared/models/PushNotificationData";
import {PrivateData} from "../shared/models/PrivateData";
import {SetUserProfile} from "../shared/models/SetUserProfile";
import {Event} from "../shared/models/Event";
import {PublishContentEvent} from "../shared/models/PublishContentEvent";
import {LoadingService} from "../core/services/loading.service";


@Component({
  selector: 'lp-test-services',
  templateUrl: './lp-test-services.component.html',
  styleUrls: ['./lp-test-services.component.scss']
})
export class LpTestServicesComponent implements OnInit{
public isLoading = false;
public appJWT: string;
public consumerJWS: string;
public branId: string;
public appKey: string;
public appSecret: string;
public ext_consumer_id: string
public conversationId: string;
public requestConversationPayload: Request;
public setUserProfilePayload:Request;
public sendMsgPayload:Request;
public message: String;
public httpOptions = {};
private subscription: Subscription;
public snackBarConfing : MatSnackBarConfig;


  constructor(public snackBar: MatSnackBar,public sendApiService: SendApiService, private loadingService:LoadingService) {

  }

  ngOnInit() {
    this.snackBarConfing = new MatSnackBarConfig();
    this.snackBarConfing.verticalPosition = 'top';
    this.snackBarConfing.horizontalPosition = 'right';

    this.branId = environment.brandId;
    this.appKey = environment.appKey;
    this.appSecret = environment.appSecret;
    this.ext_consumer_id = "ramdom_id" + Math.random();
    this.message = "HI There !";

    this.subscription = this.loadingService.isLoadingSubscription().subscribe( isLoading => {
      this.isLoading = isLoading;
    }, error => {
      console.log('SUBSCRIPTION ERROR: ' + error);
    });
  }

public getAppJWT(){
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
      },  error => {
        this.handleError(error);
        this.loadingService.stopLoading();
      }
    );
  }

public getAppConsumerJWS(){
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
        this.handleSuccess("Consumer JWS succesfully obtined");
      },  error => {
        this.handleError(error);
        this.loadingService.stopLoading();
      }
    );
  }

public openConversation() {
    const headers = {'headers': {
      'content-type':'application/json',
      'Authorization': this.appJWT,
      'x-lp-on-behalf':this.consumerJWS
    }
    };
    let body;
    body = JSON.stringify(this.getOpenConvRequestBody());

    this.sendApiService.openConversation(this.branId,body, headers).subscribe(res => {
      console.log(res);
      this.conversationId = res["convId"];
      this.handleSuccess("ConversationManager OPEN successfully with id " + this.conversationId);
    },error => {
      this.loadingService.stopLoading();
      this.handleError(error);
    });
  }

public sendMessage() {
    const headers = {'headers': {
      'content-type':'application/json',
      'Authorization': this.appJWT,
      'x-lp-on-behalf':this.consumerJWS
    }
    };
    let body;
    body = JSON.stringify(this.getMessageRequestBody());
    console.log(body);
    this.sendApiService.sendMessage(this.branId,this.conversationId,body, headers).subscribe(res => {
      console.log(res);
      this.handleSuccess("ConversationManager OPEN successfully with id " + this.conversationId);
    },error => {
      this.loadingService.stopLoading();
      this.handleError(error);
    });
  }

public closeConversation(){
    const headers = {'headers': {
      'content-type':'application/json',
      'Authorization': this.appJWT,
      'x-lp-on-behalf':this.consumerJWS
    }
    };
    this.sendApiService.closeConversation(this.branId,this.conversationId, headers).subscribe(res => {
      console.log(res);
      this.handleSuccess("ConversationManager CLOSED successfully with id " + this.conversationId);
    }),error => {
      this.loadingService.stopLoading();
      this.handleError(error);
    };
  }

private handleError(error) {
    console.log("XXX; "+error);
    this.loadingService.stopLoading();
    this.snackBarConfing.panelClass = ['snack-error'];
    this.snackBar.open('[ERROR] Response code: ' + error, 'Close', this.snackBarConfing);
  }

private handleSuccess(message) {
    this.loadingService.stopLoading();
    this.snackBarConfing.duration = 2000;
    this.snackBar.open('Request successfully sent: ' + message, null, this.snackBarConfing);
  }

private getOpenConvRequestBody(): any {
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
      "WEB UI USER",
      "Test",
      "http://avatarurl.com",
      "X",
      "http://something.com",
      "Test Description",
      privateData
    );
    this.setUserProfilePayload = new Request("req", "2,", "userprofile.SetUserProfile", setUserProfileBody);

    let event = new Event("ContentEvent", "text/plain", "Hi from ConversationHappyFlowTest!XXXXXXXX");
    let publishContentEvent = new PublishContentEvent(this.conversationId, event);
    this.sendMsgPayload = new Request("req", "3", "ms.PublishEvent", publishContentEvent);


    return body = [this.setUserProfilePayload, this.requestConversationPayload, this.sendMsgPayload];
  }

  private getMessageRequestBody() {
    return new Request("req", "3", "ms.PublishEvent", new PublishContentEvent(this.conversationId,
      new Event("ContentEvent", "text/plain", this.message)));
  }


}
