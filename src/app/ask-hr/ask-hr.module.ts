import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskHRPageRoutingModule } from './ask-hr-routing.module';

import { AskHRPage } from './ask-hr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskHRPageRoutingModule
  ],
  declarations: [AskHRPage]
})
export class AskHRPageModule {}
