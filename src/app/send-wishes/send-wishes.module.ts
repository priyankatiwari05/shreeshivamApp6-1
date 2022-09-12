import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendWishesPageRoutingModule } from './send-wishes-routing.module';

import { SendWishesPage } from './send-wishes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendWishesPageRoutingModule
  ],
  declarations: [SendWishesPage]
})
export class SendWishesPageModule {}
