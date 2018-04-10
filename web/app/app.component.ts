import {Component, OnInit} from '@angular/core';
import {SendApiService} from "./services/send-api.service";
import {environment} from '../environments/environment';
import {HttpParamsOptions} from "@angular/common/http/src/params";
import {HttpHeaders} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {ConsumerRequestConversation} from "./models/ConsumerRequestConversation";
import {CampaignInfo} from "./models/CampaignInfo";
import {Request} from "./models/Request";
import {PushNotificationData} from "./models/PushNotificationData";
import {PrivateData} from "./models/PrivateData";
import {SetUserProfile} from "./models/SetUserProfile";
import {Event} from "./models/Event";
import {PublishContentEvent} from "./models/PublishContentEvent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isLoading = false;
  private subscription: Subscription;

  constructor(private sendApiService: SendApiService) {

  }

  ngOnInit() {
    this.subscription = this.sendApiService.getIsLoading().subscribe( isLoading => {
      this.isLoading = isLoading;
    }, error => {
      console.log('SUBSCRIPTION ERROR: ' + error);
    });
  }


}
