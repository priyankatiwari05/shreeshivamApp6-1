import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelReimbersmentModalPage } from './travel-reimbersment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TravelReimbersmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelReimbersmentModalPageRoutingModule {}
