import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskHrQueriesPageRoutingModule } from './ask-hr-queries-routing.module';

import { AskHrQueriesPage } from './ask-hr-queries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskHrQueriesPageRoutingModule
  ],
  declarations: [AskHrQueriesPage]
})
export class AskHrQueriesPageModule {}
