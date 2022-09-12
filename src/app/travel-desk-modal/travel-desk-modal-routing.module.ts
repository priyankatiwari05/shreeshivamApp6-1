import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelDeskModalPage } from './travel-desk-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TravelDeskModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelDeskModalPageRoutingModule {}
