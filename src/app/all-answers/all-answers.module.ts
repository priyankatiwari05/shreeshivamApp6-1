import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAnswersPageRoutingModule } from './all-answers-routing.module';

import { AllAnswersPage } from './all-answers.page';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllAnswersPageRoutingModule
  ],
  declarations: [AllAnswersPage],
  providers: [NavParams]
})
export class AllAnswersPageModule {}
