import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation/conversation.model";

@Component({
  selector: 'lp-requests-console',
  templateUrl: './lp-requests-console.component.html',
  styleUrls: ['./lp-requests-console.component.scss']
})
export class LpRequestsConsoleComponent implements OnInit {
  @Input()
  public conversation: Conversation;

  public lasLengthOfRequests  = 0;

  @ViewChild('notifications') private notifications: ElementRef;

  constructor() { }

  ngOnInit() {
    this.lasLengthOfRequests = this.conversation.sentRequests.length;
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked(){
    if(this.conversation.sentRequests.length > this.lasLengthOfRequests){
      this.scrollToBottom();
      this.lasLengthOfRequests = this.conversation.sentRequests.length;
    }
  }

  public scrollToBottom() {
    try {
      this.notifications.nativeElement.scrollTop = this.notifications.nativeElement.scrollHeight;
    } catch (err) {

    }
  }
}
