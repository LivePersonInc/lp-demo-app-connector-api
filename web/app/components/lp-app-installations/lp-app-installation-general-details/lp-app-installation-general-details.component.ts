import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatChipInputEvent, MatStepper} from '@angular/material';
import {GeneralDetails} from './GeneralDetails';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";
import {AppInstallationsService} from "../../../core/services/app-installations.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lp-app-installation-general-details',
  templateUrl: './lp-app-installation-general-details.component.html',
  styleUrls: ['./lp-app-installation-general-details.component.scss']
})
export class LpAppInstallationGeneralDetailsComponent implements OnInit, OnDestroy {
  private selectedAppInstallChangeSubscription: Subscription;
  private appInstall: AppInstall;
  public generalDetails: GeneralDetails;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Output() detailsCreated = new EventEmitter<GeneralDetails>();
  @Input() createAppInstall: boolean;
  @ViewChild('grantTypesList') grantTypesList;

  constructor(appInstallService: AppInstallationsService) {
    if (!this.createAppInstall) {
      this.selectedAppInstallChangeSubscription = appInstallService.selectedAppInstallChange.subscribe((value) => {
        this.appInstall = value;
        this.generalDetails = {
          clientName: this.appInstall.client_name,
          description: this.appInstall.description,
          scope: this.appInstall.scope,
          grantTypes: this.appInstall.grant_types,
          uri: this.appInstall.logo_uri
        };
      });
    }
  }
  ngOnInit() {
    this.generalDetails = {
      clientName: null,
      description: null,
      scope: null,
      grantTypes: [],
      uri: null
    };
  }
  ngOnDestroy(): void {
    if (this.selectedAppInstallChangeSubscription) {
      this.selectedAppInstallChangeSubscription.unsubscribe();
    }
  }

  createGeneralDetails() {
    if (this.generalDetails.grantTypes.length === 0) {
      this.grantTypesList.errorState = true;
    } else {
      this.detailsCreated.emit(this.generalDetails);
    }
  }
  addGrantType(type: MatChipInputEvent) {
    if (!this.generalDetails.grantTypes) {
      this.generalDetails.grantTypes = [];
    }
    const value = (type.value || '').trim();
    if (value && value !== '') {
      this.generalDetails.grantTypes.push(type.value.trim());
    }
    if (type.input) {
      type.input.value = '';
    }
    if ( value && ['authorization_code', 'client_credentials', 'refresh_token'].indexOf(value) === -1) {
      this.grantTypesList.errorState = true;
    } else if (value) {
      this.grantTypesList.errorState = false;
    }
  }
  removeGrantType(type: string) {
    const index = this.generalDetails.grantTypes.indexOf(type);
    let valid = true;
    this.generalDetails.grantTypes.splice(index, 1);
    this.generalDetails.grantTypes.forEach(gt => {
      if ( gt && ['authorization_code', 'client_credentials', 'refresh_token'].indexOf(gt) === -1) {
        valid = false;
      }
    })
    if (!valid || this.generalDetails.grantTypes.length === 0) {
      this.grantTypesList.errorState = true;
    } else {
      this.grantTypesList.errorState = false;
    }
  }
}
