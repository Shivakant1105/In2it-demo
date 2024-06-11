import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuRoutingModule } from './my-menu-routing.module';

import { MyTaskComponent } from './my-task/my-task.component';
import { MyTeamComponent } from './my-team/my-team.component';


import { ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [

    MyTaskComponent,
    MyTeamComponent,
    ChildComponent,
  
  ],
  imports: [
    CommonModule,
    MyMenuRoutingModule, 
    ReactiveFormsModule, SharedModule,
    FeatherModule.pick( allIcons)
  ]
})
export class MyMenuModule { }
