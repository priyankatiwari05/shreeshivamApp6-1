import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EmpPerformancePageRoutingModule } from './emp-performance-routing.module';

import { EmpPerformancePage } from './emp-performance.page';
import { NavParams } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpPerformancePageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [EmpPerformancePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NavParams]
})
export class EmpPerformancePageModule {}
