import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTaskComponent } from './my-task/my-task.component';
import { MyTeamComponent } from './my-team/my-team.component';



const routes: Routes = [
  
   
      {path:'', redirectTo:'mytask', pathMatch:'full'},
      {path:'mytask' , component:MyTaskComponent},
      {path:'myteam' , component:MyTeamComponent},
  
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMenuRoutingModule { }
