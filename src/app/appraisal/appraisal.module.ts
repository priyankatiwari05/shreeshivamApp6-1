import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppraisalPageRoutingModule } from './appraisal-routing.module';

import { AppraisalPage } from './appraisal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppraisalPageRoutingModule
  ],
  declarations: [AppraisalPage]
})
export class AppraisalPageModule {}
