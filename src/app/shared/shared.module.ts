import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [PaginationComponent, TableComponent, FormComponent],
  exports: [PaginationComponent, TableComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
