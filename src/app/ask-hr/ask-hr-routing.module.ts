import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskHRPage } from './ask-hr.page';

const routes: Routes = [
  {
    path: '',
    component: AskHRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskHRPageRoutingModule {}
