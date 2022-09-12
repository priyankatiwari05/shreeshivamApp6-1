import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskHrFormPageRoutingModule } from './ask-hr-form-routing.module';

import { AskHrFormPage } from './ask-hr-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskHrFormPageRoutingModule
  ],
  declarations: [AskHrFormPage]
})
export class AskHrFormPageModule {}
