import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {FormControl, Validators} from '@angular/forms';
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {Capabilities} from "../../shared/models/app-installation/capabilities.model";
import {Endpoint} from "../../shared/models/app-installation/endpoint.model";
import {MatSelectChange} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'lp-app-key-secret',
  templateUrl: './lp-app-key-secret.component.html',
  styleUrls: ['./lp-app-key-secret.component.scss']
})
export class LpAppKeySecretComponent implements OnInit {

  @Output()
  public completed = new EventEmitter();
  public isCompleted: boolean;
  public selectedApp: AppInstall;
  public appList = [];

  constructor(private installationService:InstallationService,private router: Router) { }

  ngOnInit() {
    if(this.installationService.appList) {
      this.appList = this.installationService.appList;
    }
    this.installationService.istallationSubject.subscribe( event => {
      if(event === 'GET_APP_LIST'){
        this.appList = this.installationService.appList;
      }
    });
  }

  public onSelectionChange(event: MatSelectChange) {
    if(event.value instanceof AppInstall){
      this.installationService.selectedApp = this.selectedApp;
      this.completed.emit(true);

    }else{
      this.completed.emit(false);
    }
  }

  public redirectToHome(){
    this.router.navigateByUrl('/home');
  }

}
