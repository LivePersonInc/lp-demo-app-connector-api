import { Component, OnInit } from '@angular/core';
import {ChatMessage} from "../lp-chat-box-message/models/ChatMessage";

@Component({
  selector: 'app-lp-chat-box-footer',
  templateUrl: './lp-chat-box-footer.component.html',
  styleUrls: ['./lp-chat-box-footer.component.css']
})
export class LpChatBoxFooterComponent implements OnInit {

  public message: ChatMessage;

  constructor() { }

  ngOnInit() {
  }

  public sendMessage() {

  }

}
