import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelEntitlementPage } from './travel-entitlement.page';

const routes: Routes = [
  {
    path: '',
    component: TravelEntitlementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelEntitlementPageRoutingModule {}
