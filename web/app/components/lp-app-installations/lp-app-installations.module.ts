import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpWebhooksEventComponent } from './lp-webhooks-event/lp-webhooks-event.component';
import { LpWebhooksHeadersComponent } from './lp-webhooks-headers/lp-webhooks-headers.component';
import {LpAppInstallationsComponent} from "./lp-app-installations.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTooltipModule } from "@angular/material/tooltip";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "../../material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";
import {LpEndpointValidationDirective} from "./lp-webhooks-event/lp-endpoint-validation.directive";
import { LpAppInstallationGeneralDetailsComponent } from './lp-app-installation-general-details/lp-app-installation-general-details.component';
import { LpDetailsScopeValidationDirective } from './lp-app-installation-general-details/lp-details-scope-validation.directive';
import {LpConfirmationDialogComponent} from "./lp-confirmation-dialog.component";
import { LpInstallationDialogComponent } from './lp-installation-dialog/lp-installation-dialog.component';

@NgModule({
  entryComponents: [
    LpConfirmationDialogComponent,
    LpInstallationDialogComponent
  ],
  declarations: [LpAppInstallationsComponent, LpWebhooksEventComponent, LpWebhooksHeadersComponent, LpEndpointValidationDirective,
    LpAppInstallationGeneralDetailsComponent, LpConfirmationDialogComponent, LpInstallationDialogComponent,
    LpDetailsScopeValidationDirective],
  imports: [
    CommonModule,
    MatStepperModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule
  ]
})
export class LpAppInstallationsModule { }
