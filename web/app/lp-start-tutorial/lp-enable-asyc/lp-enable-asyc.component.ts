import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AccountConfigService} from "../../core/services/account-config.service";
import {InstallationService} from "../../core/services/istallation.service";
import {Router} from "@angular/router";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'lp-enable-asyc',
  templateUrl: './lp-enable-asyc.component.html',
  styleUrls: ['./lp-enable-asyc.component.scss']
})
export class LpEnableAsycComponent implements OnInit, OnDestroy {

  @Output()
  public completed = new EventEmitter();
  public accountConfigService:AccountConfigService;
  private acSubscripton: ISubscription;

  constructor(private _accountConfigService: AccountConfigService,
              private  installationService: InstallationService,
              private router: Router) {
    this.accountConfigService = _accountConfigService;
  }

  ngOnInit() {
    this.accountConfigService.acSubject.subscribe( event => {
      if(event === 'GET_LIST'){
        this.getInstalledApps();
        this.completed.emit(true);
      }
    });
    this.accountConfigService.getAccountConfigPropertiesList();
  }

  ngOnDestroy() {
    if(this.acSubscripton) this.acSubscripton.unsubscribe();
  }

  public redirectToHome(){
    this.router.navigateByUrl('/home');
  }
  private getInstalledApps() {
    if(!this.installationService.appList && this.installationService.brandId){
      this.installationService.getAppListList();
    }
  }

}
