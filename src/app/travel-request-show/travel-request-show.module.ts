import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelRequestShowPageRoutingModule } from './travel-request-show-routing.module';

import { TravelRequestShowPage } from './travel-request-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelRequestShowPageRoutingModule
  ],
  declarations: [TravelRequestShowPage]
})
export class TravelRequestShowPageModule {}
