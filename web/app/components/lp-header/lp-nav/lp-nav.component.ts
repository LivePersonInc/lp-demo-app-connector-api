import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {LpConfirmationDialogComponent} from '../../lp-confirmation-dialog/lp-confirmation-dialog.component';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'lp-nav',
  templateUrl: './lp-nav.component.html',
  styleUrls: ['./lp-nav.component.scss']
})
export class LpNavComponent implements OnDestroy {
  
  private dialogRefSubscription: Subscription;
  private routerSubscription: Subscription;
  
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) {
    
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
    
    dialogRef.componentInstance.title = 'Logout';
    dialogRef.componentInstance.message = 'You could lose your changes. Are you sure you want to logout?';
    
    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigateByUrl('/logout');
      }
    });
  }
  
}
