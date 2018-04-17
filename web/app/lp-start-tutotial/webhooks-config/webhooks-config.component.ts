import {Component, OnChanges, OnInit} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";

@Component({
  selector: 'lp-webhooks-config',
  templateUrl: './webhooks-config.component.html',
  styleUrls: ['./webhooks-config.component.scss']
})
export class WebhooksConfigComponent implements OnInit, OnChanges {

  constructor(private installationService:InstallationService) { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

}
