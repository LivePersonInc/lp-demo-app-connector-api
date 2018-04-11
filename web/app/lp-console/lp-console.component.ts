import {Component, Input, OnInit} from '@angular/core';
import {ConversationManager} from "../shared/ConversationManager";

@Component({
  selector: 'lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.scss']
})
export class LpConsoleComponent implements OnInit {

  @Input()
  public conversationManager: ConversationManager;

  constructor() { }

  ngOnInit() {
  }

}
