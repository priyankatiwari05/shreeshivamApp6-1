import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskHrQueriesPage } from './ask-hr-queries.page';

const routes: Routes = [
  {
    path: '',
    component: AskHrQueriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskHrQueriesPageRoutingModule {}
