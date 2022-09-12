import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CelebrationPageRoutingModule } from './celebration-routing.module';

import { CelebrationPage } from './celebration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CelebrationPageRoutingModule
  ],
  declarations: [CelebrationPage]
})
export class CelebrationPageModule {}
