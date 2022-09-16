import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelReimbersmentModalPageRoutingModule } from './travel-reimbersment-modal-routing.module';

import { TravelReimbersmentModalPage } from './travel-reimbersment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelReimbersmentModalPageRoutingModule
  ],
  declarations: [TravelReimbersmentModalPage]
})
export class TravelReimbersmentModalPageModule {}
