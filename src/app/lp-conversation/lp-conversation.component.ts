import {Component, NgZone, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "../services/send-api.service";
import {Conversation} from "../util/Conversation";
import {EventSourcePolyfill} from 'ng-event-source';

@Component({
  selector: 'app-lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.css']
})
export class LpConversationComponent implements OnInit {
  public brandId;
  public conversationHelper : Conversation;
  public isConvStarted:boolean;
  public appKey;
  public appSecret;
  public eventSource = new EventSourcePolyfill(`https://${environment.umsDomain}/notifications/subscribe`,{});

  constructor(public snackBar: MatSnackBar,public sendApiService: SendApiService, private zone: NgZone) { }

  ngOnInit() {
    this.brandId = environment.brandId;
    this.appKey = environment.appKey;
    this.appSecret = environment.appSecret;
    this.conversationHelper = new Conversation(this.snackBar, this.sendApiService, this.brandId, this.appKey, this.appSecret);

    this.eventSource.onmessage = (data => {
      console.log(data);
      this.zone.run(() => {
        console.log(data);
      });
    });
    this.eventSource.onopen = (a) => {
      console.log("OPEN");
    };
    this.eventSource.onerror = (e) => {
      console.log(e);

    }
  }

  public startConversation(initialMessage: string) {
    this.conversationHelper = new Conversation(this.snackBar, this.sendApiService, this.brandId, this.appKey, this.appSecret);
    this.conversationHelper.getAppJWT().then(resolve => {
      this.conversationHelper.getAppConsumerJWS().then(resolve => {
        this.conversationHelper.openConversation(initialMessage).then( resolve => {
          this.isConvStarted = true;
        });
      });
    });
  }

  public closeConversation() {
    this.conversationHelper.closeConversation();
    this.isConvStarted = false;
  }

  public sendMessage(messageText : string) {
    if(this.isConvStarted) {
      console.log(messageText);
      this.conversationHelper.sendMessage(messageText);
    }else{
      this.startConversation(messageText);
    }
  }

  public subscribeToMessageNotifications() {

  }

}
