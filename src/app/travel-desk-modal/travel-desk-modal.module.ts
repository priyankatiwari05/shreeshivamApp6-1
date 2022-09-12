import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDeskModalPageRoutingModule } from './travel-desk-modal-routing.module';

import { TravelDeskModalPage } from './travel-desk-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelDeskModalPageRoutingModule
  ],
  declarations: [TravelDeskModalPage]
})
export class TravelDeskModalPageModule {}
