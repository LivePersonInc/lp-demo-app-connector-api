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

@Component({
  selector: 'lp-login',
  templateUrl: './lp-login.component.html',
  styleUrls: ['./lp-login.component.scss']
})

export class LpLoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private loginSubscription: Subscription;
  private domainSubscription: Subscription;
  private dialogRefSubscription: Subscription;
  
  constructor(private fromBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
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
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginSubscription = this.authenticationService.userLoggedSubject.subscribe(event => {
      if (event === 'LOGGED-IN') {
        this.installationService.init();
        this.conversationService.init();
        this.accountConfigService.init();
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
    const brandId = this.loginForm.controls['brand'].value.trim();
    const userName = this.loginForm.controls['userName'].value.trim();
    const password = this.loginForm.controls['password'].value;
    this.domainsService.getDomainList(brandId);
    this.authenticationService.login(brandId, userName, password);
  }
  
  private goToHomePage() {
    this.router.navigateByUrl('home');
  }
}
