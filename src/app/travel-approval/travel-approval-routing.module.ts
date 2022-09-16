import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelApprovalPage } from './travel-approval.page';

const routes: Routes = [
  {
    path: '',
    component: TravelApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelApprovalPageRoutingModule {}
