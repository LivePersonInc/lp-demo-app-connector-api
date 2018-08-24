import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from "../../shared/models/conversation/conversation.model";

@Component({
  selector: 'lp-conversation-form',
  templateUrl: './lp-conversation-form.component.html',
  styleUrls: ['./lp-conversation-form.component.scss']
})
export class LpConversationFormComponent implements OnInit {
  private _conversation: Conversation;

  @Input() set conversation(conversation: Conversation){
    console.log(conversation);

    this._conversation = conversation;
  };

  @Output() public consumerNameChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onChange(consumerName: string) {
    console.log(consumerName);
    this.consumerNameChange.emit(consumerName);
  }

}
