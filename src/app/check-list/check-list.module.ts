import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckListPageRoutingModule } from './check-list-routing.module';

import { CheckListPage } from './check-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckListPageRoutingModule
  ],
  declarations: [CheckListPage]
})
export class CheckListPageModule {}
