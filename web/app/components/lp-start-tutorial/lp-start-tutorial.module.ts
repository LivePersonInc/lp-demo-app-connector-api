import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LpStartTutotialComponent} from "./lp-start-tutotial.component";
import {LpWebhooksConfigComponent} from "./lp-webhooks-config/lp-webhooks-config.component";
import {LpEnableAsycComponent} from "./lp-enable-asyc/lp-enable-asyc.component";
import {LpConfigCheckComponent} from "./lp-config-check/lp-config-check.component";
import {LpAppKeySecretComponent} from "./lp-app-key-secret/lp-app-key-secret.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from "../../material.module";
import {LpAppInstallationsModule} from "../lp-app-installations/lp-app-installations.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LpAppInstallationsModule
  ],
  declarations: [
    LpStartTutotialComponent,
    LpWebhooksConfigComponent,
    LpEnableAsycComponent,
    LpConfigCheckComponent,
    LpAppKeySecretComponent,
  ],
  exports: [
    LpStartTutotialComponent,
    LpWebhooksConfigComponent,
    LpEnableAsycComponent,
    LpConfigCheckComponent,
    LpAppKeySecretComponent
  ]
})
export class LpStartTutorialModule { }
