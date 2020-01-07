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
  
  public ttlValue: number;
  
  public ttls = [
    {value: 0, viewValue: 'NONE'},
    {value: 3600, viewValue: '1 hour'},
    {value: 9200, viewValue: '2 hours'},
    {value: 14400, viewValue: '4 hours'},
    {value: 21600, viewValue: '6 hours'},
    {value: 24200, viewValue: '12 hours'},
    {value: 86400, viewValue: '24 hours'},
    {value: 172800, viewValue: '48 hours'},
    {value: 259200, viewValue: '72 hours'}
  ];
  
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
