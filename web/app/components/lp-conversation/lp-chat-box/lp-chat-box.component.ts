import {AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Conversation} from '../../../shared/models/conversation/conversation.model';
import {ConversationService} from '../../../core/services/conversation.service';
import {ConversationEvent, ConvEvent} from '../../../shared/models/conversation/conversationEvent.model';
import {FileMessage} from '../../../shared/models/conversation/fileMessage.model';

@Component({
  selector: 'lp-chat-box',
  templateUrl: './lp-chat-box.component.html',
  styleUrls: ['./lp-chat-box.component.scss']
})
export class LpChatBoxComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() disabled: boolean;
  @Input() conversation: Conversation;
  @Output() onSendMessage = new EventEmitter<string>();
  @Output() onIsTyping = new EventEmitter<boolean>();
  @Output() onUploadFile = new EventEmitter<string>();
  @Output() onFileSelected = new EventEmitter<Event>();
  
  @ViewChild('messagearea', {static: false}) private messageArea: ElementRef;
  
  private pendingEvent = false;
  
  constructor(private conversationService: ConversationService) {
  }
  
  ngOnInit() {
    this.conversationService.conversationEventSubject.subscribe((event: ConversationEvent) => {
      if (event.event === ConvEvent.MSG_RECEIVED || event.event === ConvEvent.MESSAGE_SENT) {
        this.pendingEvent = true;
      }
    });
  }
  
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  
  ngAfterViewChecked() {
    if (this.pendingEvent) {
      this.scrollToBottom();
      this.pendingEvent = false;
    }
  }
  
  public sendMessage(message) {
    this.onSendMessage.emit(message);
  }
  
  public scrollToBottom() {
    try {
      this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    } catch (err) {
    
    }
  }
  
  public isConversationClosed(): boolean {
    return this.conversation && !this.conversation.isConvStarted && this.conversation.messages.length > 0;
  }
  
  public checkTyping(isTyping) {
    this.onIsTyping.emit(isTyping);
  }
  
  public sendFile(event) {
    this.onFileSelected.emit(event);
  }
  
  public onDownload(file: FileMessage) {
    this.conversationService.downloadFile(file);
  }
  
}
