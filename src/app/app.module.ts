import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { UsersModule } from './users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { servicesProviders } from './shared/services/providers';
import { interceptorProvider } from './shared/interceptors/interceptor-providers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UsersModule
  ],
  providers: [...servicesProviders, ...interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
