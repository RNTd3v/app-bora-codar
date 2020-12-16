import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [PaginationComponent, TableComponent],
  exports: [PaginationComponent, TableComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
