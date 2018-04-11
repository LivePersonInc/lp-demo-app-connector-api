import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from "./models/ChatMessage";

@Component({
  selector: 'lp-chat-box-message',
  templateUrl: './lp-chat-box-message.component.html',
  styleUrls: ['./lp-chat-box-message.component.scss']
})
export class LpChatBoxMessageComponent implements OnInit {

  @Input() public message: ChatMessage;

  constructor() {

  }

  ngOnInit() {
  }


}
