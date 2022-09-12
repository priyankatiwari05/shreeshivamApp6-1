import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AniversaryPageRoutingModule } from './aniversary-routing.module';

import { AniversaryPage } from './aniversary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AniversaryPageRoutingModule
  ],
  declarations: [AniversaryPage]
})
export class AniversaryPageModule {}
