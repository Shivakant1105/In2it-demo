import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { HeaderComponent } from './Shared/header/header.component';


import { IconsModule } from './icons/icons.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    ReactiveFormsModule,
    NgbModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
