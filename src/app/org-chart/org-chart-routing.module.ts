import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgChartPage } from './org-chart.page';

const routes: Routes = [
  {
    path: '',
    component: OrgChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgChartPageRoutingModule {}
