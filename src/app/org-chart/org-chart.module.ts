import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrgChartPageRoutingModule } from './org-chart-routing.module';
import { OrgChartPage } from './org-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrgChartPageRoutingModule
  ],
  declarations: [OrgChartPage]
})
export class OrgChartPageModule {}
