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

@NgModule({
  declarations: [
    InputComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    DynamicButtonDirective,
    CheckboxComponent
  ],
  exports: [
    DynamicFormComponent,
    CheckboxComponent
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
  ]
})
export class FormModule { }
