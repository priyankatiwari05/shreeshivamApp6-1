import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppraisalDetailsPage } from './appraisal-details.page';

const routes: Routes = [
  {
    path: '',
    component: AppraisalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppraisalDetailsPageRoutingModule {}
