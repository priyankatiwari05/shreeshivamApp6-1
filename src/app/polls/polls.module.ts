import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollsPageRoutingModule } from './polls-routing.module';

import { PollsPage } from './polls.page';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PollsPageRoutingModule
  ],
  declarations: [PollsPage],
  providers: [NavParams]
})
export class PollsPageModule {}
