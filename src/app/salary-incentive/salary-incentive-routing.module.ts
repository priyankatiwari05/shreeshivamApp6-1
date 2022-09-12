import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalaryIncentivePage } from './salary-incentive.page';

const routes: Routes = [
  {
    path: '',
    component: SalaryIncentivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryIncentivePageRoutingModule {}
