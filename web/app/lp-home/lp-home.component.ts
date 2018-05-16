import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {fadeInAnimation} from "../shared/animations/lp-animations";
import {AuthenticationService} from "../core/services/authentication.service";
import {ISubscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {InstallationService} from "../core/services/istallation.service";
import {LpConfirmationDialogComponent} from "../lp-confirmation-dialog/lp-confirmation-dialog.component";
import {MatDialog} from "@angular/material";
import {ConversationService} from "../core/services/conversation.service";
import {AccountConfigService} from "../core/services/account-config.service";
import {DomainsService} from "../core/services/domains.service";

@Component({
  selector: 'lp-home',
  templateUrl: './lp-home.component.html',
  styleUrls: ['./lp-home.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpHomeComponent implements OnInit, OnDestroy {
  public brandId: string;
  public isAuthenticated: boolean;
  public userName: string;
  public password: string;
  public authenticationService: AuthenticationService;
  public loginForm: FormGroup;

  private loginSubscription: ISubscription;
  private domainSubscription: ISubscription;
  private dialogRefSubscription: ISubscription;

  constructor(private _authenticationService: AuthenticationService,
              private installationService: InstallationService,
              private conversationService: ConversationService,
              private accountConfigService: AccountConfigService,
              private domainsService: DomainsService,
              private router: Router,
              private fb: FormBuilder,
              public dialog: MatDialog) {
    this.authenticationService = _authenticationService;
  }

  ngOnInit() {
    if(this.authenticationService.user){
      this.isAuthenticated = true;
    }
    this.loginSubscription = this.authenticationService.userLoggedSubject.subscribe(event => {
      if (event === 'LOGGED-IN') {
        this.goToStartConfigPage();
        this.isAuthenticated = true;
        this.installationService.init();
      }
      if (event === 'LOGGED-OUT') {
        this.isAuthenticated = false;
      }
    });
    this.domainSubscription = this.domainsService.domainsSubject.subscribe( event => {
      if(event === 'READY') {
        this.authenticationService.login(this.brandId, this.userName, this.password);
      }
    });
    this.loginForm = this.fb.group({
      'brand': new FormControl('', [Validators.required],),
      'email': new FormControl('', [Validators.email, Validators.required],),
      'password': new FormControl('', [Validators.required],)
    });
  }

  ngOnDestroy() {
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
    if(this.domainSubscription) this.domainSubscription.unsubscribe();
    if(this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();

  }

  public authenticate() {
    //First of all we need to know the domains
    this.domainsService.getDomainList(this.brandId);
  }

  public goToStartConfigPage() {
    this.router.navigateByUrl('home/start');
  }

  public openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent);

    dialogRef.componentInstance.title = "Logout";
    dialogRef.componentInstance.message = "This will clear all your changes. Are you sure?";

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("FSF");
        this.router.navigateByUrl('/logout');
      }
    });
  }



}
