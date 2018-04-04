import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";
import {SendApiService} from "../services/send-api.service";

@Component({
  selector: 'app-lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.css']
})
export class LpConversationComponent implements OnInit {
  public brandId;
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

  }

}
