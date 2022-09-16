import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelEntitlementModalPageRoutingModule } from './travel-entitlement-modal-routing.module';

import { TravelEntitlementModalPage } from './travel-entitlement-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelEntitlementModalPageRoutingModule
  ],
  declarations: [TravelEntitlementModalPage]
})
export class TravelEntitlementModalPageModule {}
