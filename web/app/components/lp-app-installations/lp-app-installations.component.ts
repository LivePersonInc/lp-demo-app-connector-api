import {NgForm} from "@angular/forms";
import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Event} from '../../shared/models/app-installation/event.model';
import {EndpointHeader} from "../../shared/models/app-installation/endpointHeaders.model";
import {GeneralDetails} from "./lp-app-installation-general-details/GeneralDetails";
import {MatDialog, MatSnackBar, MatStepper, MatTabGroup} from "@angular/material";
import {AppInstallationsService} from "../../core/services/app-installations.service";
import {AppInstall} from "../../shared/models/app-installation/appInstall.model";
import {Webhooks} from "../../shared/models/app-installation/webhooks.model";
import {LoadingService} from "../../core/services/loading.service";
import {Capabilities} from "../../shared/models/app-installation/capabilities.model";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LpConfirmationDialogComponent} from "./lp-confirmation-dialog.component";
import {error} from "util";

@Component({
  selector: 'app-lp-webhooks',
  templateUrl: './lp-app-installations.component.html',
  styleUrls: ['./lp-app-installations.component.scss']
})
export class LpAppInstallationsComponent implements OnInit, OnDestroy {
  private appInstallSubscription: Subscription;
  private selectedAppInstall: AppInstall;
  private avaliableApplicationInstallation: AppInstall[];
  private generalDetails: GeneralDetails;
  private eventsConfig: Event[];
  private avaliableEventTypes: object;
  private completed = false;
  @Output() eventCreated = new EventEmitter<Event>();
  @ViewChild('tabs') tabs: MatTabGroup;
  @ViewChild('stepperCreate') stepperCreate: MatStepper;
  @ViewChild('stepperUpdate') stepperUpdate: MatStepper;
  constructor(public appInstallationService: AppInstallationsService, public loadingService: LoadingService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.avaliableEventTypes = {
      'ms.MessagingEventNotification.ContentEvent' : {
        type: 'ms.MessagingEventNotification.ContentEvent',
        disabled: false,
      },
      'ms.MessagingEventNotification.RichContentEvent': {
        type: 'ms.MessagingEventNotification.RichContentEvent',
        disabled: false
      },
      'ms.MessagingEventNotification.AcceptStatusEvent': {
        type: 'ms.MessagingEventNotification.AcceptStatusEvent',
        disabled: false
      },
      'ms.MessagingEventNotification.ChatStateEvent': {
        type: 'ms.MessagingEventNotification.ChatStateEvent',
        disabled: false
      },
      'ms.MessagingEventNotification.ExConversationChangeNotification': {
        type: 'ms.MessagingEventNotification.ExConversationChangeNotification',
        disabled: false
      }
    }
    this.eventsConfig = [];
    this.generalDetails = {
      clientName: null,
      description: null,
      grantTypes: null,
      scope: null,
      uri: null
    };
    this.getAppInstallations();
  }
  ngOnDestroy() {
    if (this.appInstallSubscription) {
      this.appInstallSubscription.unsubscribe();
    }
  }
  getAppInstallations() {
    this.appInstallSubscription = this.appInstallationService.getAppInstallations()
      .subscribe(appInstallations => {
        this.avaliableApplicationInstallation = appInstallations;
        this.loadingService.stopLoading();
      });
  }
  saveGeneralDetails(details: GeneralDetails) {
    this.generalDetails = details;
    this.completed = true;
    if (this.tabs.selectedIndex === 0) {
      this.stepperCreate.next();
    } else {
      const webhooks = this.selectedAppInstall.capabilities.webhooks;
      this.eventsConfig = [];
      if (webhooks) {
        Object.keys(webhooks).forEach(type => {
          const event = webhooks[type];
          this.eventsConfig.push(new Event(type, event.endpoint, event.headers));
        });
      }
      this.stepperUpdate.next();
    }
  }
  addEvent(event: Event) {
    console.log(event);
    this.eventsConfig.push(event);
  }
  removeEventFromArray(event: Event) {
    const index = this.eventsConfig.indexOf(event);
    this.eventsConfig.splice(index, 1);
  }
  openConfirmationDialog(state: string) {
    const dialogRef = this.dialog.open(LpConfirmationDialogComponent, {data: {state}});
    dialogRef.afterClosed().subscribe(result => {
      if (result && state.toLowerCase() === 'update') {
        this.updateAppInstallation();
      } else if (result && state.toLowerCase() === 'create') {
        this.createAppInstallation();
      } else if (result && state.toLowerCase() === 'disable') {
        this.disableAppInstallation();
      }
    });
  }
  createAppInstallation() {
    const appInstall = new AppInstall();
    const capabilities = new Capabilities();
    const webhooks = new Webhooks();
    // Construct webhooks object
    // webhooks.initEndpoints();
    this.eventsConfig.forEach(eventConfig => {
      webhooks[eventConfig.type] = {
        endpoint: eventConfig.endpoint,
        headers: eventConfig.headers,
        max_retries: 3
      };
    });
    // Construct capabilities
    capabilities.webhooks = webhooks;
    // Construct app installation
    appInstall.client_name = this.generalDetails.clientName;
    appInstall.description = this.generalDetails.description;
    appInstall.enabled = true;
    appInstall.grant_types = this.generalDetails.grantTypes;
    appInstall.scope = this.generalDetails.scope;
    appInstall.logo_uri = this.generalDetails.uri;
    appInstall.capabilities = capabilities;
    this.appInstallationService.createAppInstallation(appInstall)
      .subscribe(appInstallCreated => {
        this.getAppInstallations();
        this.loadingService.stopLoading();
        this.snackBar.open(`Application installation was successfully created!`, '', {
          duration: 5000
        });
      }, e => {
        this.loadingService.stopLoading();
        this.snackBar.open(`There was an error while creating the application installation. Please try again.`, 'Close', {
          duration: 5000
        });
      });
  }
  updateAppInstallation() {
    const capabilities = new Capabilities();
    const webhooks = new Webhooks();
    // Construct webhooks object
    this.eventsConfig.forEach(eventConfig => {
      webhooks[eventConfig.type] = {
        endpoint: eventConfig.endpoint,
        headers: eventConfig.headers,
        max_retries: 3
      };
    });
    capabilities.webhooks = webhooks;
    // Construct app installation
    this.selectedAppInstall.client_name = this.generalDetails.clientName;
    this.selectedAppInstall.description = this.generalDetails.description;
    this.selectedAppInstall.enabled = true;
    this.selectedAppInstall.grant_types = this.generalDetails.grantTypes;
    this.selectedAppInstall.scope = this.generalDetails.scope;
    this.selectedAppInstall.logo_uri = this.generalDetails.uri;
    this.selectedAppInstall.capabilities = capabilities;
    this.appInstallationService.updateAppInstallation(this.selectedAppInstall)
      .subscribe(appInstallUpdated => {
        this.getAppInstallations();
        this.loadingService.stopLoading();
        this.snackBar.open(`Application installation was successfully updated`, '', {
          duration: 5000
        });
      }, e => {
        this.loadingService.stopLoading();
        this.snackBar.open(`There was an error while updating the application installation. Please try again.`, 'Close', {
          duration: 5000
        });
      });
  }
  disableAppInstallation() {
    const capabilities = new Capabilities();
    const webhooks = new Webhooks();
    // Construct webhooks object
    this.eventsConfig.forEach(eventConfig => {
      webhooks[eventConfig.type] = {
        endpoint: eventConfig.endpoint,
        headers: eventConfig.headers,
        max_retries: 3
      };
    });
    capabilities.webhooks = webhooks;
    // Construct app installation
    this.selectedAppInstall.client_name = this.generalDetails.clientName;
    this.selectedAppInstall.description = this.generalDetails.description;
    this.selectedAppInstall.enabled = true;
    this.selectedAppInstall.grant_types = this.generalDetails.grantTypes;
    this.selectedAppInstall.scope = this.generalDetails.scope;
    this.selectedAppInstall.logo_uri = this.generalDetails.uri;
    this.selectedAppInstall.capabilities = capabilities;
    this.selectedAppInstall.enabled = false;
    this.appInstallationService.updateAppInstallation(this.selectedAppInstall)
      .subscribe(appInstallUpdated => {
        this.getAppInstallations();
        this.loadingService.stopLoading();
        this.snackBar.open(`Application installation was successfully disabled`, '', {
          duration: 5000
        });
      }, e => {
        this.loadingService.stopLoading();
        this.snackBar.open(`There was an error while disabling the application installation. Please try again.`, 'Close', {
          duration: 5000
        });
      });
  }
  setSelectedAppInstall() {
    this.appInstallationService.setSelectedAppInstall(this.selectedAppInstall);
  }
}