import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaginationComponent } from './pagination/pagination.component';
import { IconModule } from './icon/icon.module';

@NgModule({
  declarations: [DialogDeleteComponent, PaginationComponent],
  exports: [DialogDeleteComponent, PaginationComponent],
  imports: [
    CommonModule,
    IconModule,
    MatDialogModule
  ]
})
export class PartialsModule {}
