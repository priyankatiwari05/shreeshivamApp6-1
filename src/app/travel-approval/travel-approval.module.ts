import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelApprovalPageRoutingModule } from './travel-approval-routing.module';

import { TravelApprovalPage } from './travel-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelApprovalPageRoutingModule
  ],
  declarations: [TravelApprovalPage]
})
export class TravelApprovalPageModule {}
