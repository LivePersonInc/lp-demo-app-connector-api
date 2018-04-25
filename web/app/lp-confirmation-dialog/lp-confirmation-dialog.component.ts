import {Component, Inject, OnInit} from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'lp-confirmation-dialog',
  templateUrl: './lp-confirmation-dialog.component.html',
  styleUrls: ['./lp-confirmation-dialog.component.scss']
})
export class LpConfirmationDialogComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<LpConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
