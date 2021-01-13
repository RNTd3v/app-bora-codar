import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PaginationComponent } from './pagination/pagination.component';
import { IconModule } from './icon/icon.module';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [DialogDeleteComponent, PaginationComponent, SearchComponent, TableComponent],
  exports: [DialogDeleteComponent, PaginationComponent, SearchComponent, TableComponent],
  imports: [
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class PartialsModule {}
