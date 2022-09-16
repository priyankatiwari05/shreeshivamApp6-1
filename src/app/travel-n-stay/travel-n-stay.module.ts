import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelNStayPageRoutingModule } from './travel-n-stay-routing.module';

import { TravelNStayPage } from './travel-n-stay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelNStayPageRoutingModule
  ],
  declarations: [TravelNStayPage]
})
export class TravelNStayPageModule {}
