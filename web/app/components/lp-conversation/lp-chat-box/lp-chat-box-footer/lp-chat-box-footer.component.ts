import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lp-chat-box-footer',
  templateUrl: './lp-chat-box-footer.component.html',
  styleUrls: ['./lp-chat-box-footer.component.scss']
})
export class LpChatBoxFooterComponent implements OnInit {
  @Output() onSendMessage = new EventEmitter<string>();
  @Output() onIsTyping = new EventEmitter<boolean>();

  @Input() disabled: boolean;
  public messageText: string;
  private isTyping = false;

  constructor() { }

  ngOnInit() {
    this.messageText = '';
  }

  public sendMessage() {
    if(this.messageText.length > 0) {
      this.onSendMessage.emit(this.messageText);
      this.messageText = '';
    }
  }

  public keyDownFunction(event) {
    if(event.keyCode == 13) {
      if(this.messageText.length > 0) {
        this.onSendMessage.emit(this.messageText);
        this.messageText = '';
        this.isTyping = false;
        this.onIsTyping.emit(this.isTyping);
      }
    }
  }
  public onTypeChange(event) {
    this.onIsTyping.emit(true);
  }
}
