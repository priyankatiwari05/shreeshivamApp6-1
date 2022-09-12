import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvancedRequestPageRoutingModule } from './advanced-request-routing.module';

import { AdvancedRequestPage } from './advanced-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvancedRequestPageRoutingModule
  ],
  declarations: [AdvancedRequestPage]
})
export class AdvancedRequestPageModule {}
