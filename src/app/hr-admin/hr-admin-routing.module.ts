import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HrAdminPage } from './hr-admin.page';

const routes: Routes = [
  {
    path: '',
    component: HrAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrAdminPageRoutingModule {}
