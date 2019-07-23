import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpWebhooksEventComponent } from './lp-webhooks-event/lp-webhooks-event.component';
import { LpWebhooksHeadersComponent } from './lp-webhooks-headers/lp-webhooks-headers.component';
import {LpAppInstallationsComponent} from "./lp-app-installations.component";
import {MatListModule, MatStepperModule, MatTooltipModule, MatChipsModule} from "@angular/material";
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

@NgModule({
  entryComponents: [
    LpConfirmationDialogComponent
  ],
  declarations: [LpAppInstallationsComponent, LpWebhooksEventComponent, LpWebhooksHeadersComponent, LpEndpointValidationDirective,
    LpAppInstallationGeneralDetailsComponent, LpConfirmationDialogComponent,
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
    MatChipsModule
  ]
})
export class LpAppInstallationsModule { }
