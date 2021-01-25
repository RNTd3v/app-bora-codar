import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { BrandComponent } from './brand/brand.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { IconModule } from '@cms/partials';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    BrandComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    PartialsModule,
    RouterModule
  ]
})
export class ThemeModule { }
