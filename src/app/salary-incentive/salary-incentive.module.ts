import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalaryIncentivePageRoutingModule } from './salary-incentive-routing.module';

import { SalaryIncentivePage } from './salary-incentive.page';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaryIncentivePageRoutingModule
  ],
  declarations: [SalaryIncentivePage],
  providers: [NavParams]
})
export class SalaryIncentivePageModule {}
