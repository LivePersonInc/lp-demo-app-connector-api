import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeInAnimation} from "../shared/animations/lp-animations";
import {AuthenticationService} from "../core/services/authentication.service";
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {InstallationService} from "../core/services/istallation.service";

@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit {
  public brandId: string;
  public userName: string;
  public password: string;
  public authenticationService: AuthenticationService;

  constructor(private _authenticationService: AuthenticationService, private installationService:InstallationService, private router: Router) {
    this.authenticationService = _authenticationService;
  }

  ngOnInit() {
    this.brandId = ""; //TODO: remove in future
    this.authenticationService.userLoggedSubject.subscribe( event => {
      if(event === 'LOGGED-IN' ) {
        this.startConfig();
        this.installationService.init();
      }
    });
  }

  public authenticate() {
    this.authenticationService.login(this.brandId,this.userName, this.password);
  }
  public startConfig(){
    this.router.navigateByUrl('home/start');
  }

}
