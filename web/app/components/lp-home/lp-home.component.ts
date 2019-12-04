import {Component, OnInit, ViewChild} from "@angular/core";
import {fadeInAnimation} from "../../shared/animations/lp-animations";
import { MatDialog } from "@angular/material/dialog";
import {AppInstallationsService} from "../../core/services/app-installations.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {LoadingService} from "../../core/services/loading.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit {
  public avaliableApplicationInstallation: AppInstall[];
  private appInstallSubscription: Subscription;
  displayedColumns: string[] = ['name',"client_secret",  'enabled', "description", 'created_at', 'menu'];
  
  constructor(public appInstallationService: AppInstallationsService,
              private authenticationService: AuthenticationService,
              private router: Router,
              public loadingService: LoadingService) {}

  ngOnInit() {
    //needed when browser refresh
    this.authenticationService.userLoggedSubject.subscribe(ev => {
      this.appInstallationService.init();
      this.getAppInstallations();
    });
  
    if(this.authenticationService.user) {
      this.getAppInstallations();
    }
  }
  
  ngOnDestroy() {
    if (this.appInstallSubscription) {
      this.appInstallSubscription.unsubscribe();
    }
  }
  
  getAppInstallations() {
    this.appInstallSubscription = this.appInstallationService.getAppInstallations()
      .subscribe(appInstallations => {
        if(appInstallations){
          console.log("SFSFSFSF");
          this.avaliableApplicationInstallation = appInstallations.filter( app => (app.scope && app.scope === 'msg.consumer'));
        }
        this.loadingService.stopLoading();
      });
  }
  
  openDemo(appInstallation) {
    console.log(appInstallation);
    this.appInstallationService.setSelectedAppInstall(appInstallation);
    this.router.navigateByUrl('demo');
  }
  
}
