import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppreciationPageRoutingModule } from './appreciation-routing.module';
import { AppreciationPage } from './appreciation.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppreciationPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [AppreciationPage]
})
export class AppreciationPageModule {}
