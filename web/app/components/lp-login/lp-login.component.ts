import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DomainsService} from "../../core/services/domains.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {InstallationService} from "../../core/services/istallation.service";
import {Router} from "@angular/router";
import {ConversationService} from "../../core/services/conversation.service";
import {AccountConfigService} from "../../core/services/account-config.service";
import {MatDialog} from "@angular/material";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'lp-login',
  templateUrl: './lp-login.component.html',
  styleUrls: ['./lp-login.component.scss']
})
export class LpLoginComponent implements OnInit {
  public brandId: string;
  public userName: string;
  public password: string;
  public loginForm: FormGroup;

  private loginSubscription: ISubscription;
  private domainSubscription: ISubscription;
  private dialogRefSubscription: ISubscription;

  constructor(private fromBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private installationService: InstallationService,
              private domainsService: DomainsService,
              private router: Router,
              private conversationService: ConversationService,
              private accountConfigService: AccountConfigService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      'brand': new FormControl('', [Validators.required],),
      'email': new FormControl('', [Validators.required],),
      'password': new FormControl('', [Validators.required],)
    });

    /*if(this.authenticationService.user){
      this.isAuthenticated = true;
    }*/
    this.loginSubscription = this.authenticationService.userLoggedSubject.subscribe(event => {
      if (event === 'LOGGED-IN') {
        //this.isAuthenticated = true;
        this.installationService.init();
        this.conversationService.init();
        this.accountConfigService.init();

        this.goToStartConfigPage();

      }
      if (event === 'LOGGED-OUT') {
        //this.isAuthenticated = false;
      }
    });


    this.conversationService.conversationRestoredSubject.subscribe( event => {
      if (event === 'RESTORED') {
        this.goToStartDemoPage();
      }
    });
    this.domainSubscription = this.domainsService.domainsSubject.subscribe( event => {
      if(event === 'READY') {
        this.authenticationService.login(this.brandId, this.userName, this.password);
      }
    });
  }

  ngOnDestroy() {
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
    if(this.domainSubscription) this.domainSubscription.unsubscribe();
    if(this.dialogRefSubscription) this.dialogRefSubscription.unsubscribe();
  }


  public authenticate() {
    this.removedWhiteSpacesAtEndAndBeginning();
    this.loadDomainsForBrand({'brandId':this.brandId,'userName':this.userName,'password':this.password});
  }

  public removedWhiteSpacesAtEndAndBeginning() {
    this.brandId = this.brandId.trim();
    this.userName = this.userName.trim();
  }

  public loadDomainsForBrand(event: any) {
    if(event && event.brandId && event.userName && event.password) {
      this.brandId = event.brandId;
      this.userName = event.userName;
      this.password = event.password;
    }
    //First of all we need to know the domains
    this.domainsService.getDomainList(this.brandId);
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

}
