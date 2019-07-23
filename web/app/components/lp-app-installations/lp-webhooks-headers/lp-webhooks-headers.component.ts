import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EndpointHeader} from '../../../shared/models/app-installation/endpointHeaders.model';

@Component({
  selector: 'app-lp-webhooks-headers',
  templateUrl: './lp-webhooks-headers.component.html',
  styleUrls: ['./lp-webhooks-headers.component.scss']
})
export class LpWebhooksHeadersComponent implements OnInit {
  @Input() header: EndpointHeader;
  @Output() headerRemoved = new EventEmitter<EndpointHeader>();
  constructor() { }

  ngOnInit() {
  }
  removeFromEventHeaderRow(header) {
    this.headerRemoved.emit(header);
  }
}
