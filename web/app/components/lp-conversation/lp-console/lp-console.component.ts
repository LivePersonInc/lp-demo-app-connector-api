import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation/conversation.model";

@Component({
  selector: 'lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.scss']
})
export class LpConsoleComponent implements OnInit {

  @Input()
  public conversation: Conversation;

  constructor() { }

  ngOnInit() {

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

}
