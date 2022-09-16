import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelEntitlementModalPage } from './travel-entitlement-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TravelEntitlementModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelEntitlementModalPageRoutingModule {}
