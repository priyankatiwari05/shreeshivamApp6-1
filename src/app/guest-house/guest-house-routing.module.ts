import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestHousePage } from './guest-house.page';

const routes: Routes = [
  {
    path: '',
    component: GuestHousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestHousePageRoutingModule {}
