import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpPerformancePage } from './emp-performance.page';

const routes: Routes = [
  {
    path: '',
    component: EmpPerformancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpPerformancePageRoutingModule {}
