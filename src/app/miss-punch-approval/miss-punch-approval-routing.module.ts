import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissPunchApprovalPage } from './miss-punch-approval.page';

const routes: Routes = [
  {
    path: '',
    component: MissPunchApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissPunchApprovalPageRoutingModule {}
