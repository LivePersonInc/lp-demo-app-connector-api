import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMessage} from "./lp-chat-box-message/models/ChatMessage";
import {Conversation} from "../util/Conversation";

@Component({
  selector: 'app-lp-chat-box',
  templateUrl: './lp-chat-box.component.html',
  styleUrls: ['./lp-chat-box.component.css']
})
export class LpChatBoxComponent implements OnInit {
  public testMessage: ChatMessage;
  public testReceivedMessage: ChatMessage;
  @Input()  conversationHelper: Conversation;
  @Output() onSendMessage = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.testReceivedMessage = new ChatMessage("received", "1522829611", "Test received message", "Manuel Test", "XX");
    this.testMessage = new ChatMessage("sent", "1522829611", "Test sent message", "Manuel Test", "XX");
  }

  public sendMessage(message) {
    this.onSendMessage.emit(message);
  }

}
