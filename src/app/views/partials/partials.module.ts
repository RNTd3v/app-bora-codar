import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { IconModule } from './icon/icon.module';

// Material modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// Services
import { IUploadService } from './upload/service/upload.service.interface';
import { UploadService } from './upload/service/upload.service';
import { IDialogService } from './dialog/service/dialog.service.interface';
import { DialogService } from './dialog/service/dialog.service';

// Components
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { TitleComponent } from './title/title.component';
import { AutoCompleteChipsComponent } from './form/auto-complete-chips/auto-complete-chips.component';
import { ConfirmPasswordComponent } from './form/confirm-password/confirm-password.component';
import { UploadComponent } from './upload/upload.component';
import { ButtonModule } from './button/button.module';
import { UserComponent } from './user/user.component';
import { ChipsComponent } from './chips/chips.component';
import { FormModule } from './form/form.module';
import { ButtonTogglesComponent } from './button-toggles/button-toggles.component';

@NgModule({
  declarations: [
    AutoCompleteChipsComponent,
    ButtonTogglesComponent,
    ConfirmPasswordComponent,
    DialogComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    TitleComponent,
    UploadComponent,
    UserComponent,
    ChipsComponent,
  ],
  exports: [
    AutoCompleteChipsComponent,
    ButtonComponent,
    ButtonTogglesComponent,
    ChipsComponent,
    ConfirmPasswordComponent,
    DialogComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    TitleComponent,
    UploadComponent,
    UserComponent
  ],
  imports: [
    ButtonModule,
    CommonModule,
    IconModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [
    { provide: IDialogService, useClass: DialogService },
    { provide: IUploadService, useClass: UploadService }
  ],
})
export class PartialsModule {}
