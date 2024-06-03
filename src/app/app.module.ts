import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { HeaderComponent } from './Shared/header/header.component';


import {  ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  
    ReactiveFormsModule,
    NgbModule,
    FeatherModule.pick( allIcons)
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
