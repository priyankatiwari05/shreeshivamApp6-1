import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LDPage } from './l-d.page';

const routes: Routes = [
  {
    path: '',
    component: LDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LDPageRoutingModule {}
