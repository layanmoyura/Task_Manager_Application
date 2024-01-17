import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { TaskFormComponentComponent } from './task-form-component/task-form-component.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: TaskListComponentComponent },
  { path: 'add', component: TaskFormComponentComponent },
  { path: 'edit/:id', component: TaskFormComponentComponent },
  {path:'details/:id',component:TaskDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
