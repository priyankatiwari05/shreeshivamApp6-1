import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsDetailPage } from './claims-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsDetailPageRoutingModule {}
