import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation/conversation.model";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'lp-advances-options-form',
  templateUrl: './lp-advanced-options-form.component.html',
  styleUrls: ['./lp-advanced-options-form.component.scss']
})
export class LpAdvancedOptionsFormComponent implements OnInit {
  private _conversation: Conversation;

  @Input() set conversation(conversation: Conversation){
    this._conversation = conversation;
    this._conversation.features.forEach( feature => {
      this.checkOptions.forEach( option => {
        if(feature === option.name){
          option.value = true;
        }
      })
    })
  };

  public checkOptions = [
    {name: "AUTO_MESSAGES", value: false},
    {name: "RICH_CONTENT", value: false},
    {name: "QUICK_REPLIES", value: false},
    {name: "MULTI_DIALOG", value: false}
  ];


  get conversation(): Conversation{
    return this._conversation
  }

  constructor() { }

  @Output() public consumerNameChange = new EventEmitter<string>();

  public isConvStarted(): boolean{
    return this._conversation && this._conversation.isConvStarted;
  }
  ngOnInit() {}

  onChange(consumerName: string) {
    this.consumerNameChange.emit(consumerName);
  }
}
