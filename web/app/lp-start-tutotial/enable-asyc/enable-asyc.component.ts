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

  public isAsyncMessagingEnabled(): boolean {
    let feature = this.accountConfigService.accountConfigPropList.accountConfigResponse.acApp.accountList.account.grantedFeatures.grantedFeature
      .filter( e => e.$.id == "Common.Async_Messaging");
    console.log(feature);



    return feature.value._;
  }

  public enableAsyncMessaging(): boolean {
    this.accountConfigService.updateAccountConfigProperties();
    return true;
  }

}
