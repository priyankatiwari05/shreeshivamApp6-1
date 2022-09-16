import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAnswersPage } from './all-answers.page';

const routes: Routes = [
  {
    path: '',
    component: AllAnswersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllAnswersPageRoutingModule {}
