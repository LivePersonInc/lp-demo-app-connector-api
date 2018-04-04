import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "../services/send-api.service";
import {Conversation} from "../util/Conversation";
import {ChatMessage} from "../lp-chat-box/lp-chat-box-message/models/ChatMessage";

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
  constructor(public snackBar: MatSnackBar,public sendApiService: SendApiService) { }

  ngOnInit() {
    this.brandId = environment.brandId;
    this.appKey = environment.appKey;
    this.appSecret = environment.appSecret;
    this.conversationHelper = new Conversation(this.snackBar, this.sendApiService, this.brandId, this.appKey, this.appSecret);
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

}
