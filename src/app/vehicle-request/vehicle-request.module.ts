import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleRequestPageRoutingModule } from './vehicle-request-routing.module';

import { VehicleRequestPage } from './vehicle-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleRequestPageRoutingModule
  ],
  declarations: [VehicleRequestPage]
})
export class VehicleRequestPageModule {}
