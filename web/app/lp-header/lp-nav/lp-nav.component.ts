import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
  selector: 'lp-nav',
  templateUrl: './lp-nav.component.html',
  styleUrls: ['./lp-nav.component.scss']
})
export class LpNavComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
