import { Component, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'lp-confirmation-dialog',
  templateUrl: './lp-confirmation-dialog.component.html',
  styleUrls: ['./lp-confirmation-dialog.component.scss']
})
export class LpConfirmationDialogComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<LpConfirmationDialogComponent>) { }

  ngOnInit() {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
