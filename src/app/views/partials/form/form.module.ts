import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { DynamicButtonDirective } from './dynamic-button/dynamic-button.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ToggleComponent } from './toggle/toggle.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckboxPermissionsComponent } from './checkbox-permissions/checkbox-permissions.component';

@NgModule({
  declarations: [
    InputComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    DynamicButtonDirective,
    CheckboxComponent,
    ToggleComponent,
    CheckboxPermissionsComponent
  ],
  exports: [
    DynamicFormComponent,
    CheckboxComponent,
    ToggleComponent,
    CheckboxPermissionsComponent
  ],
  entryComponents: [
    InputComponent
  ],
  imports: [
    ButtonModule,
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class FormModule { }
