import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TravelEntitlementPageRoutingModule } from './travel-entitlement-routing.module';

import { TravelEntitlementPage } from './travel-entitlement.page';
import { NavParams } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelEntitlementPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [TravelEntitlementPage],
  providers: [NavParams]
})
export class TravelEntitlementPageModule {}
