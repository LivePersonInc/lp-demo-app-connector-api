import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../shared/animations/lp-animations";
import {AuthenticationService} from "../../core/services/authentication.service";
import {ISubscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {InstallationService} from "../../core/services/istallation.service";
import {LpConfirmationDialogComponent} from "../lp-confirmation-dialog/lp-confirmation-dialog.component";
import {MatDialog} from "@angular/material";
import {DomainsService} from "../../core/services/domains.service";
import {ConversationService} from "../../core/services/conversation.service";
import {AccountConfigService} from "../../core/services/account-config.service";
import {ConversationEvent} from "../../shared/models/conversation/conversationEvent.model";

@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit, OnDestroy {
  public brandId: string;
  public userName: string;
  public authenticationService: AuthenticationService;

  private dialogRefSubscription: ISubscription;

  constructor(private _authenticationService: AuthenticationService,
              private router: Router,
              private conversationService: ConversationService,
              public dialog: MatDialog) {
    this.authenticationService = _authenticationService;
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if(this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();
  }

  public goToStartConfigPage() {
    this.router.navigateByUrl('settings/start');
  }

  public goToStartDemoPage() {
    this.router.navigateByUrl('demo');
  }

  public isConversationRestored(): boolean {
    if (this.conversationService.conversation) {
      return true;
    }
    return false;
  }

  public openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent);

    dialogRef.componentInstance.title = "Logout";
    dialogRef.componentInstance.message = "This will clear all your changes. Are you sure?";

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigateByUrl('/logout');
      }
    });
  }

}
