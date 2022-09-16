import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckListFormPageRoutingModule } from './check-list-form-routing.module';

import { CheckListFormPage } from './check-list-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckListFormPageRoutingModule
  ],
  declarations: [CheckListFormPage]
})
export class CheckListFormPageModule {}
