import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { TaskFormComponentComponent } from './task-form-component/task-form-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: TaskListComponentComponent },
  { path: 'add', component: TaskFormComponentComponent },
  { path: 'edit/:id', component: TaskFormComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
