import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BusinessPageRoutingModule } from './business-routing.module';
import { BusinessPage } from './business.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [BusinessPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BusinessPageModule {}
