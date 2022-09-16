import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestHousePageRoutingModule } from './guest-house-routing.module';

import { GuestHousePage } from './guest-house.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestHousePageRoutingModule
  ],
  declarations: [GuestHousePage]
})
export class GuestHousePageModule {}
