import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { UsersModule } from './users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { servicesProviders } from './shared/services/providers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UsersModule
  ],
  providers: [...servicesProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
