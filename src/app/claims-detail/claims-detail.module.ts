import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimsDetailPageRoutingModule } from './claims-detail-routing.module';

import { ClaimsDetailPage } from './claims-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimsDetailPageRoutingModule
  ],
  declarations: [ClaimsDetailPage]
})
export class ClaimsDetailPageModule {}
