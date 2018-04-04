import {Component, EventEmitter, OnInit Output} from '@angular/core';
import {ChatMessage} from "../lp-chat-box-message/models/ChatMessage";

@Component({
  selector: 'app-lp-chat-box-footer',
  templateUrl: './lp-chat-box-footer.component.html',
  styleUrls: ['./lp-chat-box-footer.component.css']
})
export class LpChatBoxFooterComponent implements OnInit {
  @Output() onSendMessage = new EventEmitter<string>();

  public messageText: String;

  constructor() {
  }

  ngOnInit() {
    this.messageText = "";

  }

  public sendMessage() {
    this.onSendMessage.emit(this.messageText);
  }

}
