import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleRequestPage } from './vehicle-request.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRequestPageRoutingModule {}
