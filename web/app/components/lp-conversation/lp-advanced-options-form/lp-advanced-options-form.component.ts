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
  };

  get conversation(): Conversation{
    return this._conversation
  }

  constructor() { }

  @Output() public consumerNameChange = new EventEmitter<string>();


  ngOnInit() {}



}
