import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LDPageRoutingModule } from './l-d-routing.module';

import { LDPage } from './l-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LDPageRoutingModule
  ],
  declarations: [LDPage]
})
export class LDPageModule {}
