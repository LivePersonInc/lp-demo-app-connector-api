import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {LpConfirmationDialogComponent} from "../../lp-confirmation-dialog/lp-confirmation-dialog.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'lp-nav',
  templateUrl: './lp-nav.component.html',
  styleUrls: ['./lp-nav.component.scss']
})
export class LpNavComponent implements OnInit, OnDestroy {

  private dialogRefSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();
  }

  isUserAuthenticated() {
    return this.authenticationService.user && this.authenticationService.user.token;
  }

  public openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent);

    dialogRef.componentInstance.title = "Logout";
    dialogRef.componentInstance.message = "You could lost your changes. Are you sure?";

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigateByUrl('/logout');
      }
    });
  }

}
