import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CnpjPipe } from './utils/pipes/cnpj.pipe';
import { MaskDirective } from './utils/directives/mask.directive';

@NgModule({
  declarations: [CnpjPipe, MaskDirective],
  imports: [
    CommonModule
  ],
  exports: [ CnpjPipe, MaskDirective ]
})
export class SharedModule { }
