import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';

import { SolutionComponent } from './solution/solution.component';
import { ProcessComponent } from './process/process.component';


import { HumanTaskComponent } from './human-task/human-task.component';
import { WorkflowsExecutionComponent } from './workflows-execution/workflows-execution.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { OrganizationComponent } from './organization/organization.component';
import { ContactComponent } from './contact/contact.component';
import { IconsModule } from 'src/app/icons/icons.module';

import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowsComponent } from './organization/workflows/workflows.component';
@NgModule({
  declarations: [
  
    SolutionComponent,
    ProcessComponent,
  WorkflowsComponent,
    HumanTaskComponent,
    WorkflowsExecutionComponent,
    ScheduleComponent,
    OrganizationComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule, IconsModule,
    NgbModule,NgbNavModule,
  ]
})
export class OrganizationModule { }
