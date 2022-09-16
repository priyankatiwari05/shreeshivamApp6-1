import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckListFormPage } from './check-list-form.page';

const routes: Routes = [
  {
    path: '',
    component: CheckListFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckListFormPageRoutingModule {}
