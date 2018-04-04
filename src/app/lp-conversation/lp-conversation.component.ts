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
  public convesationHelper : Conversation;
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
    this.convesationHelper = new Conversation(this.snackBar, this.sendApiService, this.brandId, this.appKey, this.appSecret);
    this.convesationHelper.getAppJWT().then(resolve => {
      this.convesationHelper.getAppConsumerJWS().then( resolve => {
        this.convesationHelper.openConversation();
      });
    });
  }

}
