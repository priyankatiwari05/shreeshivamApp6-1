import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaisedRequestPage } from './raised-request.page';

const routes: Routes = [
  {
    path: '',
    component: RaisedRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RaisedRequestPageRoutingModule {}
