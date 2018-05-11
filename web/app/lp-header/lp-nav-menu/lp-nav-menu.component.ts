import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
  selector: 'lp-nav-menu',
  templateUrl: './lp-nav-menu.component.html',
  styleUrls: ['./lp-nav-menu.component.scss']
})
export class LpNavMenuComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  isUserAuthenticated() {
    return this.authenticationService.user && this.authenticationService.user.token;
  }

}
