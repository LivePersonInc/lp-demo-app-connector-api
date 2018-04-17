import { Component, OnInit } from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'lp-app-key-secret',
  templateUrl: './app-key-secret.component.html',
  styleUrls: ['./app-key-secret.component.scss']
})
export class AppKeySecretComponent implements OnInit {
  public selectControl = new FormControl('', [Validators.required]);
  public selectedApp;
  public appList = [];

  constructor(private installationService:InstallationService) { }

  ngOnInit() {
    this.installationService.getAppListList();

    this.installationService.istallationSubject.subscribe( event => {
      if(event === 'GET_APP_LIST'){
        this.appList = this.installationService.appList;
        console.log(this.installationService.appList);
      }
    });
  }

  public next(){
    this.installationService.selectedApp = this.selectedApp;
    console.log(this.selectedApp);
  }

}
