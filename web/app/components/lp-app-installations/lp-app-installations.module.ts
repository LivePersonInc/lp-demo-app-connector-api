import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {LpConfirmationDialogComponent} from "./lp-confirmation-dialog.component";
import { LpInstallationDialogComponent } from './lp-installation-dialog/lp-installation-dialog.component';
import {LpWebhooksFormComponent} from "./lp-webhooks-form/lp-webhooks-form.component";
import { LpWebhooksEndpointComponent } from './lp-webhooks-endpoint/lp-webhooks-endpoint.component';

@NgModule({
  entryComponents: [
    LpConfirmationDialogComponent,
    LpInstallationDialogComponent
  ],
  declarations: [LpAppInstallationsComponent,
    LpConfirmationDialogComponent,
    LpInstallationDialogComponent,
    LpWebhooksFormComponent,
    LpWebhooksEndpointComponent],
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
