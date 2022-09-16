import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppraisalPage } from './appraisal.page';

const routes: Routes = [
  {
    path: '',
    component: AppraisalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppraisalPageRoutingModule {}
