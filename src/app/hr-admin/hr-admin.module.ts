import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HrAdminPageRoutingModule } from './hr-admin-routing.module';

import { HrAdminPage } from './hr-admin.page';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HrAdminPageRoutingModule
  ],
  declarations: [HrAdminPage],
  providers: [NavParams]
})
export class HrAdminPageModule {}
