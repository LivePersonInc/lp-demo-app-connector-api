import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation/conversation.model";
import {ConversationService} from "../../../core/services/conversation.service";
import {ConversationEvent, ConvEvent} from "../../../shared/models/conversation/conversationEvent.model";

@Component({
  selector: 'lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.scss']
})
export class LpConsoleComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input()
  public conversation: Conversation;

  @ViewChild('notifications') private notifications: ElementRef;

  private pendingEvent = false;

  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.conversationService.conversationEventSubject.subscribe( (event:ConversationEvent) => {
      if(event.event === ConvEvent.EVENT_RECEIVED ){
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

  public scrollToBottom() {
    try {
      this.notifications.nativeElement.scrollTop = this.notifications.nativeElement.scrollHeight;
    } catch(err) {

    }
  }

  public checkIfHasRoleProperty(notification: any){
    return notification && notification.body && notification.body.changes.length > 0
      && notification.body.changes[0].originatorMetadata  && notification.body.changes[0].originatorMetadata.role;

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
