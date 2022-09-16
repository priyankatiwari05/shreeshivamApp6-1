import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimRequestsPageRoutingModule } from './claim-requests-routing.module';

import { ClaimRequestsPage } from './claim-requests.page';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimRequestsPageRoutingModule
  ],
  declarations: [ClaimRequestsPage],
  providers: [NavParams]
})
export class ClaimRequestsPageModule {}
