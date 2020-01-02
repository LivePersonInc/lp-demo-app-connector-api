import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Endpoint} from '../../../shared/models/app-installation/endpoint.model';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {EndpointHeader} from '../../../shared/models/app-installation/endpointHeaders.model';

@Component({
  selector: 'lp-webhooks-endpoint',
  templateUrl: './lp-webhooks-endpoint.component.html',
  styleUrls: ['./lp-webhooks-endpoint.component.scss']
})
export class LpWebhooksEndpointComponent implements OnInit {
  
  @Input() endpointType: string;
  @Input() endpointDescription: string;
  @Input() webhooksEndpoint: Endpoint;
  @Output() webhooksEndpointChange = new EventEmitter();
  
  public headerName = '';
  public headerValue = '';
  
  
  public endpointFormControl: FormControl;
  
  private pattern = '^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\\'\\/\\\\+=&;%\\$#_]*)?$';
  
  constructor(private formBuilder: FormBuilder) {
  }
  
  ngOnInit() {
    this.endpointFormControl = new FormControl('', [Validators.pattern(this.pattern),]);
  }
  
  webhookChange(value) {
    this.webhooksEndpointChange.emit(this.webhooksEndpoint);
  }
  
  addHeader() {
    const header: EndpointHeader = new EndpointHeader(this.headerName, this.headerValue);
    this.webhooksEndpoint.headers.push(header);
    console.log(this.webhooksEndpoint);
  }
  
  removeHeader(i) {
    this.webhooksEndpoint.headers.splice(i, 1);
  }
  
}
