import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { IconModule } from './icon/icon.module';

// Material modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogConfirmComponent } from './dialog/dialog-confirm/dialog-confirm.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [DialogComponent, DialogConfirmComponent, PaginationComponent, SearchComponent, TableComponent, TitleComponent, ButtonComponent],
  exports: [DialogComponent, DialogConfirmComponent, PaginationComponent, SearchComponent, TableComponent, TitleComponent, ButtonComponent],
  imports: [
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class PartialsModule {}
