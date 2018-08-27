import {Component, Input, OnInit} from '@angular/core';
import {Webhooks} from "../../../../shared/models/app-installation/webhooks.model";

@Component({
  selector: 'lp-webhooks-info',
  templateUrl: './lp-webhooks-info.component.html',
  styleUrls: ['./lp-webhooks-info.component.scss']
})
export class LpWebhooksInfoComponent implements OnInit {

  @Input() public webhooks: Webhooks;

  constructor() { }

  ngOnInit() {
  }

}
