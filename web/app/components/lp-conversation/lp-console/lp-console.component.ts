import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation/conversation.model";

@Component({
  selector: 'lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.scss']
})
export class LpConsoleComponent implements OnInit {

  @Input()
  public conversation: Conversation;


  @ViewChild('notifications') private notifications: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }


  public scrollToBottom() {
    try {
      this.notifications.nativeElement.scrollTop = this.notifications.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

  public checkIfHasConversationStateProperty(notification: any){
    return notification.type === 'cqm.ExConversationChangeNotification' && notification.body && notification.body.changes.length > 0
      && notification.body.changes[0].result  && notification.body.changes[0].result.conversationDetails
      && notification.body.changes[0].result.conversationDetails.state ;

  }

  public checkIfHasSequenceProperty(notification: any){
    return notification.type === 'ms.MessagingEventNotification' && notification.body && notification.body.changes.length > 0
      && (notification.body.changes[0].sequence || notification.body.changes[0].sequence == 0);
  }

  public checkIfHasChatStateEventProperty(notification: any){
    return notification.type === 'ms.MessagingEventNotification' && notification.body && notification.body.changes.length > 0
      && (notification.body.changes[0].event && notification.body.changes[0].event.type && notification.body.changes[0].event.chatState);
  }


  public checkIfAcceptStatusEvent(notification: any){
    return this.checkIfHasChatStateEventProperty && notification.body.changes[0].event.type === 'AcceptStatusEvent';
  }

}
