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
    MatTooltipModule
  ]
})
export class PartialsModule {}
