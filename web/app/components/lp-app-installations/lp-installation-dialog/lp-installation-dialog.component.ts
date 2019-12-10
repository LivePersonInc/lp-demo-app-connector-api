import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";
import {LpAppInstallationsComponent} from "../lp-app-installations/lp-app-installations.component";

@Component({
  selector: 'app-lp-installation-dialog',
  templateUrl: './lp-installation-dialog.component.html',
  styleUrls: ['./lp-installation-dialog.component.sass']
})
export class LpInstallationDialogComponent implements OnInit {
  
  appInstall: AppInstall;
  @ViewChild(LpAppInstallationsComponent, {static: true}) appInstallationsComponent: LpAppInstallationsComponent;
  
  constructor(
    public dialogRef: MatDialogRef<LpInstallationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("CONSTRUCTOR");
    console.log(data);
  
    if(data.appInstall) {
      this.appInstall = data.appInstall;
      console.log(this.appInstall);
    }
  }
  
  ngOnInit() {}
  
  public installNewApp(){
    this.dialogRef.close({data:this.appInstallationsComponent.createAppInstallation()});
  }
  
  
}
