import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDeskPageRoutingModule } from './travel-desk-routing.module';

import { TravelDeskPage } from './travel-desk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelDeskPageRoutingModule
  ],
  declarations: [TravelDeskPage]
})
export class TravelDeskPageModule {}
