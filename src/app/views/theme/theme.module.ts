import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BaseComponent } from './base/base.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { BrandComponent } from './brand/brand.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { ButtonModule, IconModule } from '@cms/partials';
import { PartialsModule } from '../partials/partials.module';
import { NavComponent } from './nav/nav.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { themeReducer } from './state/theme.reducer';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    BrandComponent,
    ContentComponent,
    NavComponent
  ],
  imports: [
    ButtonModule,
    CommonModule,
    IconModule,
    PartialsModule,
    RouterModule,
    MatTooltipModule,
    StoreModule.forFeature('theme', themeReducer)
  ]
})
export class ThemeModule { }
