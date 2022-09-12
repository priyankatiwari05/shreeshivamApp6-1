import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskHrFormPage } from './ask-hr-form.page';

const routes: Routes = [
  {
    path: '',
    component: AskHrFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskHrFormPageRoutingModule {}
