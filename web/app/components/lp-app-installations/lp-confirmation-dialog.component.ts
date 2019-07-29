import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-lp-confirmation-dialog',
  templateUrl: 'lp-confirmation-dialog.component.html',
})
export class LpConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LpConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
