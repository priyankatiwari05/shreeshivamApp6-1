import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvancedRequestPage } from './advanced-request.page';

const routes: Routes = [
  {
    path: '',
    component: AdvancedRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedRequestPageRoutingModule {}
