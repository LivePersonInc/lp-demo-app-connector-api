import {Component, Input, OnInit} from '@angular/core';
import {ConversationManager} from "../util/ConversationManager";

@Component({
  selector: 'app-lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.css']
})
export class LpConsoleComponent implements OnInit {

  @Input()
  public conversationManager: ConversationManager;

  constructor() { }

  ngOnInit() {
  }

}
