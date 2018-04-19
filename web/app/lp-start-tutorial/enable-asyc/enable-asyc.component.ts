import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountConfigService} from "../../core/services/account-config.service";
import {InstallationService} from "../../core/services/istallation.service";

@Component({
  selector: 'lp-enable-asyc',
  templateUrl: './enable-asyc.component.html',
  styleUrls: ['./enable-asyc.component.scss']
})
export class EnableAsycComponent implements OnInit {

  @Output()
  public completed = new EventEmitter();

  constructor(private accountConfigService:AccountConfigService, private  installationService: InstallationService) { }

  ngOnInit() {
    this.accountConfigService.acSubject.subscribe( event => {
      if(event === 'GET_LIST'){
        this.getInstalledApps();
        this.completed.emit(true);
      }
    });
    this.accountConfigService.getAccountConfigPropertiesList();
  }

  private getInstalledApps() {
    if(!this.installationService.appList){
      this.installationService.getAppListList();
    }

  }
}
