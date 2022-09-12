import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskMasterPageRoutingModule } from './task-master-routing.module';

import { TaskMasterPage } from './task-master.page';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskMasterPageRoutingModule
  ],
  declarations: [TaskMasterPage],
  providers : [NavParams]
})
export class TaskMasterPageModule {}
