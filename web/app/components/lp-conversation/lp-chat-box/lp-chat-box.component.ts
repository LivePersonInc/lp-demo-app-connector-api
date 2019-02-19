import {
  AfterViewChecked,
  AfterViewInit,
  Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild,
  HostListener
} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation/conversation.model";
import {ConversationService} from "../../../core/services/conversation.service";
import {ConversationEvent, ConvEvent} from "../../../shared/models/conversation/conversationEvent.model";

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

  public isDragged:Boolean;

  @ViewChild('messagearea') private messageArea: ElementRef;

  private pendingEvent = false;

  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.conversationService.conversationEventSubject.subscribe( (event:ConversationEvent) => {
      if(event.event === ConvEvent.MSG_RECEIVED || event.event === ConvEvent.MESSAGE_SENT){
        this.pendingEvent = true;
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked(){
    if(this.pendingEvent){
      this.scrollToBottom();
      this.pendingEvent = false;
    }
  }

  public sendMessage(message) {
    this.onSendMessage.emit(message);
  }
  public onDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragged = false;

    console.log("UploadEvent");
    console.log(event.dataTransfer);

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (
        event.dataTransfer.items[i].kind === "file" &&
          event.dataTransfer.items[i].type == "application/x-zip-compressed"
        ) {
          var file = event.dataTransfer.items[i].getAsFile();
          console.log(file);
          //this.files.push(file);
        }
      }
    }
  }
  public onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.isDragged = true;

  }

  public onDragleave(event: any) {
    this.isDragged = false;
  }

  public scrollToBottom() {
    try {
      this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    } catch(err) {

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

    /*console.log(event);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
    }*/
  }

}
