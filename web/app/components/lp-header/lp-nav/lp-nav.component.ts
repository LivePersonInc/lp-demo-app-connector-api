import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {NavigationEnd, Router} from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {LpConfirmationDialogComponent} from "../../lp-confirmation-dialog/lp-confirmation-dialog.component";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'lp-nav',
  templateUrl: './lp-nav.component.html',
  styleUrls: ['./lp-nav.component.scss']
})
export class LpNavComponent implements OnInit, OnDestroy {

  private dialogRefSubscription: Subscription;
  private routerSubscription: Subscription;
  private showHome: boolean;
  private showSettings: boolean;
  private showDemo: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const url = event.url.toLocaleLowerCase();
      if (url.indexOf('settings') !== -1) {
        this.showHome = true;
        this.showDemo = true;
        this.showSettings = true;
      } else if (url.indexOf('appinstall') !== -1) {
        this.showHome = true;
        this.showDemo = false;
        this.showSettings = false;
      } else if (url.indexOf('home') !== -1) {
        this.showHome = true;
        this.showDemo = false;
        this.showSettings = false;
      } else if (url.indexOf('demo') !== -1) {
        this.showHome = true;
        this.showDemo = true;
        this.showSettings = true;
      } else {
        this.showHome = true;
        this.showSettings = false;
        this.showDemo = false;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  isUserAuthenticated() {
    return this.authenticationService.user && this.authenticationService.isLoggedIn;
  }

  public openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent);

    dialogRef.componentInstance.title = "Logout";
    dialogRef.componentInstance.message = "You could lose your changes. Are you sure you want to logout?";

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigateByUrl('/logout');
      }
    });
  }

}
