import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-lp-conversation',
  templateUrl: './lp-conversation.component.html',
  styleUrls: ['./lp-conversation.component.css']
})
export class LpConversationComponent implements OnInit {
  public brandId;
  public appKey;
  public appSecret;
  constructor() { }

  ngOnInit() {

    this.brandId = environment.brandId;
    this.appKey = environment.appKey;
    this.appSecret = environment.appSecret;
  }

}
