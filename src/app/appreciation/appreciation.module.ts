import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppreciationPageRoutingModule } from './appreciation-routing.module';
import { AppreciationPage } from './appreciation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppreciationPageRoutingModule
  ],
  declarations: [AppreciationPage]
})
export class AppreciationPageModule {}
