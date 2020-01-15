import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {LpConfirmationDialogComponent} from '../../lp-confirmation-dialog/lp-confirmation-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lp-nav-menu',
  templateUrl: './lp-nav-menu.component.html',
  styleUrls: ['./lp-nav-menu.component.scss']
})
export class LpNavMenuComponent implements OnInit, OnDestroy {
  
  private dialogRefSubscription: Subscription;
  private routerSubscription: Subscription;
  
  
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) {
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
    return this.authenticationService.isLoggedIn;
  }
  
  public openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent);
    
    dialogRef.componentInstance.title = 'Logout';
    dialogRef.componentInstance.message = 'This will clear all your changes. Are you sure?';
    
    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigateByUrl('/logout');
      }
    });
  }
  
}
