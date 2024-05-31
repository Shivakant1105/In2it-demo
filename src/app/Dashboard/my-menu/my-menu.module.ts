import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuRoutingModule } from './my-menu-routing.module';

import { MyTaskComponent } from './my-task/my-task.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { IconsModule } from 'src/app/icons/icons.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';


@NgModule({
  declarations: [

    MyTaskComponent,
    MyTeamComponent,
    ChildComponent,
  
  ],
  imports: [
    CommonModule,
    MyMenuRoutingModule, IconsModule   ,
    ReactiveFormsModule, 
  ]
})
export class MyMenuModule { }
