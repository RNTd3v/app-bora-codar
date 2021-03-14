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
import { appReducer } from './state/app.reducer';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    StoreModule.forFeature('app', appReducer)
  ]
})
export class ThemeModule { }
