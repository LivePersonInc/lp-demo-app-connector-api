import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @ViewChild('messagearea') private messageArea: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public sendMessage(message) {
    this.onSendMessage.emit(message);
  }

  public  scrollToBottom() {
    try {
      this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

}
