import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelDocModalPage } from './travel-doc-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TravelDocModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelDocModalPageRoutingModule {}
