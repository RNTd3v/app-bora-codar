import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    MatTooltipModule
  ]
})
export class ButtonModule { }
