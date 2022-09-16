import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LDAdminPageRoutingModule } from './l-d-admin-routing.module';

import { LDAdminPage } from './l-d-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LDAdminPageRoutingModule
  ],
  declarations: [LDAdminPage]
})
export class LDAdminPageModule {}
