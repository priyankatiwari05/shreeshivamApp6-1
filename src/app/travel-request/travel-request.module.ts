import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TravelRequestPageRoutingModule } from './travel-request-routing.module';
import { TravelRequestPage } from './travel-request.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelRequestPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [TravelRequestPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class TravelRequestPageModule {}
