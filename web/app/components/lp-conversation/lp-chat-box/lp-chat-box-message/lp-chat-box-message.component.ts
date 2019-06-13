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

  public messageType: string;


  @ViewChild('structuredContent') d1: ElementRef;

  constructor (private renderer: Renderer2){

  }

  public addElement(content) {
    const rooEl = JsonPollock.render(content);
    console.log(rooEl);

    const structuredContentElement: HTMLParagraphElement = rooEl;
    this.renderer.appendChild(this.d1.nativeElement, structuredContentElement);
  }

  ngAfterViewInit(): void {
    //TODO: Seb
    if(this.message.message.content) {
      //Mind that this doesn't work for quick replies.
      this.addElement(this.message.message.content)
    }
  }

  ngOnInit() {
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
