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

  @ViewChild('notifications') private notifications: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
