import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaiseAttendencePage } from './raise-attendence.page';

const routes: Routes = [
  {
    path: '',
    component: RaiseAttendencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaiseAttendencePageRoutingModule {}
