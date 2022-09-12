import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AniversaryPage } from './aniversary.page';

const routes: Routes = [
  {
    path: '',
    component: AniversaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AniversaryPageRoutingModule {}
