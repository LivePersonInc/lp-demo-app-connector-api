import {Component, Input, OnInit} from '@angular/core';
import {AccountConfigService} from "../../core/services/account-config.service";

@Component({
  selector: 'lp-enable-asyc',
  templateUrl: './enable-asyc.component.html',
  styleUrls: ['./enable-asyc.component.scss']
})
export class EnableAsycComponent implements OnInit {

  constructor(private accountConfigService:AccountConfigService) { }

  ngOnInit() {
    this.accountConfigService.getAccountConfigPropertiesList();
  }

  public enableAsyncMessaging(): boolean {
    //TODO:
    return true;
  }

}
