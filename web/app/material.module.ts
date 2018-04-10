import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatGridListModule,
  MatDialogModule,
  MatSnackBarModule, MatHorizontalStepper, MatStepperModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule

  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule
  ]
})
export class MaterialModule {}
