import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-lp-chat-box-footer',
  templateUrl: './lp-chat-box-footer.component.html',
  styleUrls: ['./lp-chat-box-footer.component.css']
})
export class LpChatBoxFooterComponent implements OnInit {
  @Output() onSendMessage = new EventEmitter<string>();

  public messageText: string;

  constructor() {
  }

  ngOnInit() {
    this.messageText = "";

  }

  public sendMessage() {
    if(this.messageText.length > 0) {
      this.onSendMessage.emit(this.messageText);
      this.messageText = "";
    }
  }

}
