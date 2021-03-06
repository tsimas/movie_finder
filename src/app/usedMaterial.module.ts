import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatGridListModule,
  MatSlideToggleModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatCheckboxModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatGridListModule,
    MatSlideToggleModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ]
})
export class UsedMaterialModule { }
