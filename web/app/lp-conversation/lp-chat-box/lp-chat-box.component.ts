import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {ChatMessage} from "../../shared/models/conversation/chatMessage.model";
import {Conversation} from "../../shared/models/conversation/conversation";

@Component({
  selector: 'lp-chat-box',
  templateUrl: './lp-chat-box.component.html',
  styleUrls: ['./lp-chat-box.component.scss']
})
export class LpChatBoxComponent implements OnInit {
  @Input()  conversationManager: Conversation;
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
