import { Component, OnInit } from '@angular/core';
import {InstallationService} from "../../core/services/istallation.service";

@Component({
  selector: 'lp-app-key-secret',
  templateUrl: './app-key-secret.component.html',
  styleUrls: ['./app-key-secret.component.scss']
})
export class AppKeySecretComponent implements OnInit {

  constructor(private  installationService:InstallationService) { }

  ngOnInit() {
    this.installationService.getAppListList();
    this.installationService.istallationSubject.subscribe( event => {
      if(event === 'GET_APP_LIST'){
        console.log(this.installationService.app_list);
      }
    });
  }

}
