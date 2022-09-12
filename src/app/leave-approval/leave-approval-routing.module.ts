import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveApprovalPage } from './leave-approval.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveApprovalPageRoutingModule {}
