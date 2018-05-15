import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Conversation} from "../../shared/models/conversation/conversation.model";

@Component({
  selector: 'lp-console',
  templateUrl: './lp-console.component.html',
  styleUrls: ['./lp-console.component.scss']
})
export class LpConsoleComponent implements OnInit, OnChanges {

  @Input()
  public conversation: Conversation;

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {


  }

}
