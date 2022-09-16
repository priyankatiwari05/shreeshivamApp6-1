import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveApprovalPageRoutingModule } from './leave-approval-routing.module';

import { LeaveApprovalPage } from './leave-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveApprovalPageRoutingModule
  ],
  declarations: [LeaveApprovalPage]
})
export class LeaveApprovalPageModule {}
