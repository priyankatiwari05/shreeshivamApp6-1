import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelRequestPage } from './travel-request.page';

const routes: Routes = [
  {
    path: '',
    component: TravelRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelRequestPageRoutingModule {}
