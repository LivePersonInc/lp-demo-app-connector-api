import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "../services/send-api.service";
import {Conversation} from "../util/Conversation";

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
  public isConversationStared: Boolean;
  constructor(public snackBar: MatSnackBar,public sendApiService: SendApiService) { }

  ngOnInit() {

    this.brandId = environment.brandId;
    this.appKey = environment.appKey;
    this.appSecret = environment.appSecret;


  }

  public startConversation() {
    this.conversationHelper = new Conversation(this.snackBar, this.sendApiService, this.brandId, this.appKey, this.appSecret);
    this.conversationHelper.getAppJWT().then(resolve => {
      this.conversationHelper.getAppConsumerJWS().then(resolve => {
        this.conversationHelper.openConversation();
        this.isConvStarted = true;
      });
    });
  }

  public closeConversation() {
    this.conversationHelper.closeConversation();
    this.isConvStarted = false;
  }

  public sendMessage() {

  }

}
