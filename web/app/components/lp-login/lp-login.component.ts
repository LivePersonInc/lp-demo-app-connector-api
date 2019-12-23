import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DomainsService} from '../../core/services/domains.service';
import {AuthenticationService} from '../../core/services/authentication.service';
import {InstallationService} from '../../core/services/installation.service';
import {Router} from '@angular/router';
import {ConversationService} from '../../core/services/conversation.service';
import {AccountConfigService} from '../../core/services/account-config.service';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AppInstallationsService} from '../../core/services/app-installations.service';

@Component({
  selector: 'lp-login',
  templateUrl: './lp-login.component.html',
  styleUrls: ['./lp-login.component.scss']
})

export class LpLoginComponent implements OnInit, OnDestroy {
  public brandId: string;
  public userName: string;
  public password: string;
  public loginForm: FormGroup;
  private loginSubscription: Subscription;
  private domainSubscription: Subscription;
  private dialogRefSubscription: Subscription;
  
  constructor(private fromBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private appInstallationService: AppInstallationsService,
              private installationService: InstallationService,
              private domainsService: DomainsService,
              private router: Router,
              private conversationService: ConversationService,
              private accountConfigService: AccountConfigService,
              public dialog: MatDialog) {
  }
  
  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      brand: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginSubscription = this.authenticationService.userLoggedSubject.subscribe(event => {
      if (event === 'LOGGED-IN') {
        this.installationService.init();
        this.appInstallationService.init();
        this.conversationService.init();
        this.accountConfigService.init();
        this.goToHomePage();
      }
    });
    this.conversationService.conversationRestoredSubject.subscribe(event => {
      if (event === 'RESTORED') {
        this.goToHomePage();
      }
    });
  }
  
  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.domainSubscription) {
      this.domainSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }
  
  public authenticate(event) {
    this.removedWhiteSpacesAtEndAndBeginning();
    if (event && event.brandId && event.userName && event.password) {
      this.brandId = event.brandId;
      this.userName = event.userName;
      this.password = event.password;
    }
    this.domainsService.getDomainList(this.brandId);
    this.authenticationService.login(this.brandId, this.userName, this.password);
  }
  
  public removedWhiteSpacesAtEndAndBeginning() {
    this.brandId = this.brandId.trim();
    this.userName = this.userName.trim();
  }
  
  private goToHomePage() {
    this.router.navigateByUrl('home');
  }
}
