import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelDocModalPageRoutingModule } from './travel-doc-modal-routing.module';

import { TravelDocModalPage } from './travel-doc-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelDocModalPageRoutingModule
  ],
  declarations: [TravelDocModalPage]
})
export class TravelDocModalPageModule {}
