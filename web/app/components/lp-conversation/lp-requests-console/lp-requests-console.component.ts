import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Conversation} from '../../../shared/models/conversation/conversation.model';

@Component({
  selector: 'lp-requests-console',
  templateUrl: './lp-requests-console.component.html',
  styleUrls: ['./lp-requests-console.component.scss']
})
export class LpRequestsConsoleComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input()
  public conversation: Conversation;
  public lastLengthOfRequests = 0;
  @ViewChild('notifications', {static: false}) private notifications: ElementRef;
  
  constructor() {
  }
  
  ngOnInit() {
    if (this.conversation && this.conversation.sentRequests) {
      this.lastLengthOfRequests = this.conversation.sentRequests.length;
    }
  }
  
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  
  ngAfterViewChecked() {
    if (this.conversation && this.conversation.sentRequests.length > this.lastLengthOfRequests) {
      this.scrollToBottom();
      this.lastLengthOfRequests = this.conversation.sentRequests.length;
    }
  }
  
  public scrollToBottom() {
    try {
      this.notifications.nativeElement.scrollTop = this.notifications.nativeElement.scrollHeight;
    } catch (err) {
    
    }
  }
}
