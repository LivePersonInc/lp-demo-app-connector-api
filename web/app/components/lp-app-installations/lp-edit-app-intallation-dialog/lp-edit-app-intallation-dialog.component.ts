import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";

@Component({
  selector: 'lp-edit-app-intallation-dialog',
  templateUrl: './lp-edit-app-intallation-dialog.component.html',
  styleUrls: ['./lp-edit-app-intallation-dialog.component.sass']
})
export class LpEditAppIntallationDialogComponent implements OnInit {
  
  public appInstallation: AppInstall;
  
  constructor(
    public dialogRef: MatDialogRef<LpEditAppIntallationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  
    console.log("OPEN DIALOG");
  
    console.log(data);
  
    if(data.appInstallation) {
      this.appInstallation = data.appInstallation;
      console.log(this.appInstallation);
    }
  }
  
  
  ngOnInit() {}
  
  updateAppInstallation() {
  
  }
  
}
