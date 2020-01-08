import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppInstall} from '../../../shared/models/app-installation/appInstall.model';
import {LpEditAppInstallationComponent} from '../lp-edit-app-installation/lp-edit-app-installation.component';

@Component({
  selector: 'lp-edit-app-intallation-dialog',
  templateUrl: './lp-edit-app-intallation-dialog.component.html',
  styleUrls: ['./lp-edit-app-intallation-dialog.component.sass']
})
export class LpEditAppIntallationDialogComponent implements OnInit {
  
  public appInstallation: AppInstall;
  @ViewChild(LpEditAppInstallationComponent, {static: true}) appEditInstallationsComponent: LpEditAppInstallationComponent;
  
  constructor(public dialogRef: MatDialogRef<LpEditAppIntallationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    if (data.appInstallation) {
      this.appInstallation = new AppInstall().deserialize(data.appInstallation);
    }
  }
  
  ngOnInit() {
  }
  
  updateAppInstallation() {
    this.appEditInstallationsComponent.updateEditableApplicationFields();
    this.dialogRef.close({data: this.appInstallation});
  }
  
}
