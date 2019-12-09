import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Event} from '../../shared/models/app-installation/event.model';
import {EndpointHeader} from "../../shared/models/app-installation/endpointHeaders.model";
import {GeneralDetails} from "./lp-app-installation-general-details/GeneralDetails";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatStepper } from "@angular/material/stepper";
import { MatTabGroup } from "@angular/material/tabs";
import {AppInstallationsService} from "../../core/services/app-installations.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {LoadingService} from "../../core/services/loading.service";
import {Capabilities} from "../../shared/models/app-installation/capabilities.model";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LpConfirmationDialogComponent} from "./lp-confirmation-dialog.component";
import {AuthenticationService} from "../../core/services/authentication.service";
import {InstallationService} from "../../core/services/installation.service";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'lp-app-installations',
  templateUrl: './lp-app-installations.component.html',
  styleUrls: ['./lp-app-installations.component.scss']
})
export class LpAppInstallationsComponent implements OnInit {
  public selectedAppInstall: AppInstall;
  public webhooks: Webhooks;
  public completed: boolean;
  public form: FormGroup;
  public isDemoChecked:boolean;
  public ttlValue:number;
  
  public server = environment.server;
  public currentURL = "https://" + this.server + "/notifications/event";
  private pattern = "^https\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\'\\/\\\\+=&;%\\$#_]*)?$";
  
  @Output() eventCreated = new EventEmitter<Event>();
  @ViewChild('tabs', {static: false}) tabs: MatTabGroup;
  @ViewChild('stepperCreate', {static: false}) stepperCreate: MatStepper;
  @ViewChild('stepperUpdate', {static: false}) stepperUpdate: MatStepper;
  @ViewChild('appInstallGeneralDetails', {static: false}) appInstallGeneralDetails;
  @ViewChild('updateAppInstallGeneralDeateils',  {static: false}) updateAppInstallGeneralDeateils;
  
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private  installationService:InstallationService) {}
 
  public ttls = [
    {value: 3600, viewValue: '1 hour'},
    {value: 9200, viewValue: '2 hours'},
    {value: 9200, viewValue: '4 hours'},
    {value: 9200, viewValue: '6 hours'},
    {value: 9200, viewValue: '12 hours'},
    {value: 9200, viewValue: '24 hours'},
    {value: 9200, viewValue: '48 hours'}

  ];
  
  ngOnInit() {
    this.form = new FormGroup({
      appName: new FormControl(''),
      description: new FormControl(''),
      endpoint: new FormControl(''),
    },);
    
    this.ttlValue = 3600;
    this.initWebhooks();
  }
  
  
  private initWebhooks() {
    this.webhooks = new Webhooks();
    this.webhooks.initEndpoints();
    this.webhooks['ms.MessagingEventNotification.AcceptStatusEvent'].endpoint = "https://dsgsdgsdgsdhsd";
  }
  
  public toggleDemoAppServerEndpoint() {
    if(this.isDemoChecked){
      this.form.patchValue({
        endpoint: this.currentURL
      });
    } else {
      this.form.patchValue({
        endpoint: ""
      });
    }
  }
  
  
}
