import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Webhooks} from '../../../shared/models/app-installation/webhooks.model';

@Component({
  selector: 'lp-webhooks-form',
  templateUrl: './lp-webhooks-form.component.html',
  styleUrls: ['./lp-webhooks-form.component.scss']
})
export class LpWebhooksFormComponent implements OnInit {
  
  @Input() public webhooks: Webhooks;
  
  @Output() webhooksChange = new EventEmitter<Webhooks>();
  
  
  constructor() {
  }
  
  ngOnInit() {
  
  }
  
  public webhooksEndpointChange() {
    this.webhooksChange.emit(this.webhooks);
  }
  
}
