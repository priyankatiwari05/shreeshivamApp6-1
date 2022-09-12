import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppreciationPage } from './appreciation.page';

const routes: Routes = [
  {
    path: '',
    component: AppreciationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppreciationPageRoutingModule {}
