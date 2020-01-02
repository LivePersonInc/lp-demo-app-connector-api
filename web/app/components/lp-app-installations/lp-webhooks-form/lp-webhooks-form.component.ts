import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';

@Component({
  selector: 'lp-webhooks-form',
  templateUrl: './lp-webhooks-form.component.html',
  styleUrls: ['./lp-webhooks-form.component.scss']
})
export class LpWebhooksFormComponent implements OnInit {
  
  @Input() public webhooks: Webhooks;
  
  @Output() webhooksChange = new EventEmitter<Webhooks>();
  
  public webhooksForm: FormGroup;
  
  private pattern = '^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\\'\\/\\\\+=&;%\\$#_]*)?$';
  
  constructor(private formBuilder: FormBuilder) {
  }
  
  ngOnInit() {
    this.webhooksForm = this.formBuilder.group({
      AcceptStatusEvent: new FormControl('', [Validators.pattern(this.pattern)]),
      ChatStateEvent: new FormControl('', [Validators.pattern(this.pattern)]),
      ContentEvent: new FormControl('', [Validators.pattern(this.pattern)]),
      RichContentEvent: new FormControl('', [Validators.pattern(this.pattern)]),
      ExConversationChangeNotification: new FormControl('', [Validators.pattern(this.pattern)])
    });
  }
  
  public webhooksEndpointChange() {
    this.webhooksChange.emit(this.webhooks);
  }
  
}
