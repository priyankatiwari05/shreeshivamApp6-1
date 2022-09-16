import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaiseAttendencePageRoutingModule } from './raise-attendence-routing.module';

import { RaiseAttendencePage } from './raise-attendence.page';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaiseAttendencePageRoutingModule
  ],
  declarations: [RaiseAttendencePage],
  providers: [NavParams]
})
export class RaiseAttendencePageModule {}
