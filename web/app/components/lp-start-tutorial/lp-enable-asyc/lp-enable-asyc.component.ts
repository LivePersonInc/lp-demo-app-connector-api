import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AccountConfigService} from "../../../core/services/account-config.service";
import {InstallationService} from "../../../core/services/installation.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'lp-enable-asyc',
  templateUrl: './lp-enable-asyc.component.html',
  styleUrls: ['./lp-enable-asyc.component.scss']
})
export class LpEnableAsycComponent implements OnInit, OnDestroy {

  @Output()
  public completed = new EventEmitter();
  public accountConfigService:AccountConfigService;
  private acSubscripton: Subscription;

  constructor(private _accountConfigService: AccountConfigService,
              private  installationService: InstallationService,
              private router: Router,
              ) {
    this.accountConfigService = _accountConfigService;
  }

  ngOnInit() {
    this.accountConfigService.acSubject.subscribe( event => {
      if(event === 'DONE'){
        this.completed.emit(true);
      }
    });
    this.accountConfigService.getIsAsyncMessagingPropActive();
  }

  ngOnDestroy() {
    if(this.acSubscripton) this.acSubscripton.unsubscribe();
  }

  public redirectToHome(){
    this.router.navigateByUrl('/settings');
  }

  public getInstalledApps() {
    this.installationService.getAppListList();
  }

}
