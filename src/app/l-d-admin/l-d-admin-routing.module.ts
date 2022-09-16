import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LDAdminPage } from './l-d-admin.page';

const routes: Routes = [
  {
    path: '',
    component: LDAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LDAdminPageRoutingModule {}
