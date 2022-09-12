import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppraisalDetailsPageRoutingModule } from './appraisal-details-routing.module';

import { AppraisalDetailsPage } from './appraisal-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppraisalDetailsPageRoutingModule
  ],
  declarations: [AppraisalDetailsPage]
})
export class AppraisalDetailsPageModule {}
