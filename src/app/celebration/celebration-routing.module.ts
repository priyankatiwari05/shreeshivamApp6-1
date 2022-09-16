import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CelebrationPage } from './celebration.page';

const routes: Routes = [
  {
    path: '',
    component: CelebrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CelebrationPageRoutingModule {}
