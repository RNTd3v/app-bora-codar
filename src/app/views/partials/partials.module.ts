import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [DialogDeleteComponent],
  exports: [DialogDeleteComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class PartialsModule { }
