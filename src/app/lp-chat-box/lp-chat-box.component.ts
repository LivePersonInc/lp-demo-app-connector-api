import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMessage} from "./lp-chat-box-message/models/ChatMessage";
import {ConversationManager} from "../util/ConversationManager";

@Component({
  selector: 'app-lp-chat-box',
  templateUrl: './lp-chat-box.component.html',
  styleUrls: ['./lp-chat-box.component.css']
})
export class LpChatBoxComponent implements OnInit {
  @Input()  conversationManager: ConversationManager;
  @Output() onSendMessage = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public sendMessage(message) {
    this.onSendMessage.emit(message);
  }

}
