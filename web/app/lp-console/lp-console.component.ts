import {Component, Input, OnInit} from '@angular/core';
import {Conversation} from "../shared/models/conversation/conversation";

@Component({
  selector: 'lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.scss']
})
export class LpConsoleComponent implements OnInit {

  @Input()
  public conversationManager: Conversation;

  constructor() { }

  ngOnInit() {
  }

}
