import {Component, Input, OnInit} from '@angular/core';
import {AccountConfigService} from "../../core/services/account-config.service";

@Component({
  selector: 'lp-enable-asyc',
  templateUrl: './enable-asyc.component.html',
  styleUrls: ['./enable-asyc.component.scss']
})
export class EnableAsycComponent implements OnInit {

  public isAsyncMessaging = false;

  constructor(private accountConfigService:AccountConfigService) { }

  ngOnInit() {

    this.accountConfigService.getAccountConfigPropertiesList();

    this.accountConfigService.acSubject.subscribe( event => {
      if(event === "GET_LIST"){
        this.isAsyncMessaging = this.isAsyncMessagingEnabled();
      }
    });
  }

  public isAsyncMessagingEnabled(): boolean {
    let feature = this.accountConfigService.accountConfigPropList.appDataList[0].accountList.accountList[0].itemsCollection.data
      .filter( e => e.compoundFeatureID == "Common.Async_Messaging");
    //console.log(feature);
    return feature[0].value.value;
  }

  public enableAsyncMessaging(): boolean {

    //TODO:
    // this.accountConfigService.updateAccountConfigProperties();
    return true;
  }

}
