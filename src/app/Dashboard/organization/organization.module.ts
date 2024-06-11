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

import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowsComponent } from './organization/workflows/workflows.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/Shared/shared.module';
@NgModule({
  declarations: [
    SolutionComponent,
    ProcessComponent,
    WorkflowsComponent,
    HumanTaskComponent,
    WorkflowsExecutionComponent,
    ScheduleComponent,
    OrganizationComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
ReactiveFormsModule,
    FeatherModule.pick(allIcons),
    AgGridModule, SharedModule
  ],
})
export class OrganizationModule {}
