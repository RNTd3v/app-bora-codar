import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from './pagination/pagination.component';
import { IconModule } from './icon/icon.module';

@NgModule({
  declarations: [DialogDeleteComponent, PaginationComponent],
  exports: [DialogDeleteComponent, PaginationComponent],
  imports: [
    CommonModule,
    IconModule,
    MatDialogModule,
    MatTooltipModule
  ]
})
export class PartialsModule {}
