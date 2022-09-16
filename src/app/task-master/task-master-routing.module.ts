import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskMasterPage } from './task-master.page';

const routes: Routes = [
  {
    path: '',
    component: TaskMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskMasterPageRoutingModule {}
