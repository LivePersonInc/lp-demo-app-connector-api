import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  private generalDetails: GeneralDetails;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Output() detailsCreated = new EventEmitter<GeneralDetails>();
  @Input() createAppInstall: boolean;

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
    console.log('OnInit');
    console.log(this.appInstall);
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
    this.detailsCreated.emit(this.generalDetails);
  }
  addGrantType(type: MatChipInputEvent) {
    if (!this.generalDetails.grantTypes) {
      this.generalDetails.grantTypes = [];
    }
    if ((type.value || '').trim()) {
      this.generalDetails.grantTypes.push(type.value.trim());
    }
    if (type.input) {
      type.input.value = '';
    }
  }
  removeGrantType(type: string) {
    const index = this.generalDetails.grantTypes.indexOf(type);
    this.generalDetails.grantTypes.splice(index, 1);
  }
}
