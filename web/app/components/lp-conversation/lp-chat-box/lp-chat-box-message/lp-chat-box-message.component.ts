import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from "../../../../shared/models/conversation/chatMessage.model";

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

  public isTodayMessage(): boolean {
    let messageDate = new Date(this.message.timestamp);
    let today = new Date();

    return (messageDate.getFullYear() === today.getFullYear())  &&
      (messageDate.getMonth() === today.getMonth()) &&
      (messageDate.getDay() === today.getDay());
  }

  public isYesterdayMessage(): boolean {
    let messageDate = new Date(this.message.timestamp);
    let today = new Date();

    return (messageDate.getFullYear() === today.getFullYear())  &&
      (messageDate.getMonth() === today.getMonth()) &&
      (messageDate.getDay() === today.getDay()-1);
  }


}
