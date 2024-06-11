import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionComponent } from './solution/solution.component';
import { ProcessComponent } from './process/process.component';

import { HumanTaskComponent } from './human-task/human-task.component';
import { WorkflowsExecutionComponent } from './workflows-execution/workflows-execution.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { OrganizationComponent } from './organization/organization.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
 
      {path:'', redirectTo:'organization', pathMatch:'full'},
      {path:'organization', component: OrganizationComponent},
      {path:'contact', component: ContactComponent}, 
      {path:'solution' , component:SolutionComponent},
      {path:'process' , component:ProcessComponent},
      // {path:'workflows', component:WorkflowsComponent},
      {path:'human', component: HumanTaskComponent},
      {path:'execution', component: WorkflowsExecutionComponent},
      {path:'schedule', component: ScheduleComponent}
     

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
