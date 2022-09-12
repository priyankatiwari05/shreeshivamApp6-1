import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpPerformancePageRoutingModule } from './emp-performance-routing.module';

import { EmpPerformancePage } from './emp-performance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpPerformancePageRoutingModule
  ],
  declarations: [EmpPerformancePage]
})
export class EmpPerformancePageModule {}
