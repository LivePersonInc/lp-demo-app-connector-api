import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Endpoint} from "../../../shared/models/app-installation/endpoint.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  
  private pattern = "^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\'\\/\\\\+=&;%\\$#_]*)?$";
  
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.endpointFormControl = new FormControl('',[Validators.pattern(this.pattern),]);
  }
  webhookChange(value){
    this.webhooksEndpointChange.emit(this.webhooksEndpoint);
  }
  
  addHeader(){
    let header = {};
    header.header_name = this.headerName;
    header.header_value = this.headerValue;
    this.webhooksEndpoint.headers.push(header)
  }

}
