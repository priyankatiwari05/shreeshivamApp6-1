import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCalendarPage } from './my-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: MyCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCalendarPageRoutingModule {}
