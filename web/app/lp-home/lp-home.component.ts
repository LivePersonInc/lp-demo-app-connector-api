import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeInAnimation} from "../shared/animations/lp-animations";
import {AuthenticationService} from "../core/services/authentication.service";
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {InstallationService} from "../core/services/istallation.service";
import {LpConfirmationDialogComponent} from "../lp-confirmation-dialog/lp-confirmation-dialog.component";
import {MatDialog} from "@angular/material";
import {ConversationService} from "../core/services/conversation.service";
import {AccountConfigService} from "../core/services/account-config.service";

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

  constructor(private _authenticationService: AuthenticationService,
              private installationService:InstallationService,
              private conversationService:ConversationService,
              private accountConfigService: AccountConfigService,
              private router: Router,
              public dialog: MatDialog) {
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

  public openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent);

    dialogRef.componentInstance.title = "Logout";
    dialogRef.componentInstance.message = "This will clear all your changes. Are you sure?";

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          this.authenticationService.logOut();
          this.installationService.reset();
          this.conversationService.reset();
          this.accountConfigService.reset();
      }
    });
  }

}
