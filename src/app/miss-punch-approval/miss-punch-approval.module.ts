import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissPunchApprovalPageRoutingModule } from './miss-punch-approval-routing.module';

import { MissPunchApprovalPage } from './miss-punch-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissPunchApprovalPageRoutingModule
  ],
  declarations: [MissPunchApprovalPage]
})
export class MissPunchApprovalPageModule {}
