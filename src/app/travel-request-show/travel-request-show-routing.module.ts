import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelRequestShowPage } from './travel-request-show.page';

const routes: Routes = [
  {
    path: '',
    component: TravelRequestShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelRequestShowPageRoutingModule {}
