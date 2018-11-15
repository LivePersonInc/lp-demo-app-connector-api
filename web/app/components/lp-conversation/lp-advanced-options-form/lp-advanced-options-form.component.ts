import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from "../../../shared/models/conversation/conversation.model";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Options} from "../../../shared/models/conversation/options.model";

@Component({
  selector: 'lp-advances-options-form',
  templateUrl: './lp-advanced-options-form.component.html',
  styleUrls: ['./lp-advanced-options-form.component.scss']
})
export class LpAdvancedOptionsFormComponent implements OnInit {
  private _conversation: Conversation;

  protected options: Options = {
    features: [],
    userName: "",
    skillId: "",
    engagementId:0,
    campaignId: 0,
    context_name:""
  };

  @Input() set conversation(conversation: Conversation){
    this._conversation = conversation;
    this._conversation.features.forEach( feature => {
      this.checkOptions.forEach( option => {
        if(feature === option.name){
          option.value = true;
        }
      })
    });
    this.options.userName = this.conversation.userName;
    this.options.skillId = this.conversation.skillId;
    this.options.context_name = this.conversation.context_name;
    this.options.engagementId = this.conversation.engagementId;
    this.options.campaignId = this.conversation.campaignId;


    this.onChange();
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

  @Output() public conversationChange = new EventEmitter<any>();

  public isConvStarted(): boolean{
    return this._conversation && this._conversation.isConvStarted;
  }
  ngOnInit() {}

  onChange() {
    let features = [];
    this.checkOptions.forEach(option => {
      console.log(option);
      if(option.value){
        features.push(option.name);
      }
    });

    this.options.features = features;

    this.conversationChange.emit(this.options);
  }
}
