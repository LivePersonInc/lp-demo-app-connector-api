import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";

@Component({
  selector: 'app-lp-installation-dialog',
  templateUrl: './lp-installation-dialog.component.html',
  styleUrls: ['./lp-installation-dialog.component.sass']
})
export class LpInstallationDialogComponent implements OnInit {
  
  appInstall: AppInstall;
  
  constructor(
    public dialogRef: MatDialogRef<LpInstallationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    
    if(data.appInstall) {
      this.appInstall = data.appInstall;
      console.log(this.appInstall);
    }
  }
  
  ngOnInit() {
  }
  
  appCreated(appInstall){
  
  }
  
  installNewApp(){
    if(this.appInstall){
      this.dialogRef.close("appInstall");
    }
  }
  

}
