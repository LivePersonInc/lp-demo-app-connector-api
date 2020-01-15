import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LpAppInstallationsComponent} from '../lp-app-installations/lp-app-installations.component';

@Component({
  selector: 'lp-installation-dialog',
  templateUrl: './lp-installation-dialog.component.html',
  styleUrls: ['./lp-installation-dialog.component.sass']
})
export class LpInstallationDialogComponent implements OnInit {
  
  @ViewChild(LpAppInstallationsComponent, {static: true}) appInstallationsComponent: LpAppInstallationsComponent;
  
  constructor(public dialogRef: MatDialogRef<LpInstallationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  
  ngOnInit() {
  }
  
  public installNewApp() {
    this.dialogRef.close({data: this.appInstallationsComponent.createAppInstallation()});
  }
  
}
