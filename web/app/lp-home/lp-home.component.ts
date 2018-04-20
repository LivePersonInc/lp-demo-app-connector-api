import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeInAnimation} from "../shared/animations/lp-animations";
import {AuthenticationService} from "../core/services/authentication.service";
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";

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

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.brandId = ""; //TODO: remove in future
    this.authenticationService.userLoggedSubject.subscribe( event => {
      if(event === 'LOGGED-IN' ) {
        this.router.navigateByUrl('home/start');
        console.log("logged In");
        console.log(this.authenticationService.getUser());
      }
    });
  }

  public authenticate() {
    this.authenticationService.login(this.brandId,this.userName, this.password);
  }

}
