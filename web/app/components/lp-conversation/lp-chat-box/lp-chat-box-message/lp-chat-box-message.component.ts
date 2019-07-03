import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, Renderer, Renderer2, ElementRef, ViewChild} from '@angular/core';
import {ChatMessage, MessageType} from '../../../../shared/models/conversation/chatMessage.model';
import {FileMessage} from '../../../../shared/models/conversation/fileMessage.model';
import * as JsonPollock from '../../../../../../node_modules/json-pollock/dist/json-pollock.bundle.min.js';



@Component({
  selector: 'lp-chat-box-message',
  templateUrl: './lp-chat-box-message.component.html',
  styleUrls: ['./lp-chat-box-message.component.scss']
})
export class LpChatBoxMessageComponent implements OnInit, AfterViewInit {
  @Input() public message: ChatMessage;
  @Output() download = new EventEmitter<FileMessage>();
  @Output() onSendMessage = new EventEmitter<string>();

  public messageType: string;

  @ViewChild('structuredContent') d1: ElementRef;

  constructor (private renderer: Renderer2) { }

  public addRichContentTextElement(content) {
    const rooEl = JsonPollock.render(content);
    const structuredContentElement: HTMLParagraphElement = rooEl;
    this.renderer.appendChild(this.d1.nativeElement, structuredContentElement);
    this.renderer.addClass(this.d1.nativeElement, "rich-content-text");
  }
  
  public addRichContentQuickReplyButtonElement(content) {
    const rooEl = JsonPollock.render(content);
    const structuredContentElement: HTMLParagraphElement = rooEl;
    this.renderer.appendChild(this.d1.nativeElement, structuredContentElement);
    const btnEl = this.d1.nativeElement.lastChild;
    this.renderer.listen(btnEl, 'click', (event) => {
      this.onSendMessage.emit(btnEl.textContent);
    });
  }

  ngAfterViewInit(): void {
    if(this.message.isRichContent) {
      this.addRichContentTextElement(this.message.message.content);
      if(this.message.message && this.message.message.quickReplies && this.message.message.quickReplies.replies) {
        this.message.message.quickReplies.replies.forEach( reply => {
          this.addRichContentQuickReplyButtonElement(reply);
        })
      }
    }
  }

  ngOnInit() {
    const linkCallback = (data) => {
      window.open(data.actionData.uri,"_blank");
    };
    JsonPollock.registerAction('link', linkCallback);
    this.messageType = MessageType[this.message.type].toLocaleLowerCase();
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

  public onDownload() {
     this.download.emit(this.message.file);
  }

}
