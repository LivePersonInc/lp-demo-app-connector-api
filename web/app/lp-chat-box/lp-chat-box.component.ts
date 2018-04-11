import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {ChatMessage} from "./lp-chat-box-message/models/ChatMessage";
import {ConversationManager} from "../util/ConversationManager";

@Component({
  selector: 'lp-chat-box',
  templateUrl: './lp-chat-box.component.html',
  styleUrls: ['./lp-chat-box.component.scss']
})
export class LpChatBoxComponent implements OnInit {
  @Input()  conversationManager: ConversationManager;
  @Output() onSendMessage = new EventEmitter<string>();
  @ViewChild('messagearea') private messageArea: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  public sendMessage(message) {
    this.onSendMessage.emit(message);
  }

  public scrollToBottom() {
    try {
      this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    } catch(err) {

    }
  }


}
