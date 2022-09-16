import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RaisedRequestPageRoutingModule } from './raised-request-routing.module';

import { RaisedRequestPage } from './raised-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RaisedRequestPageRoutingModule
  ],
  declarations: [RaisedRequestPage]
})
export class RaisedRequestPageModule {}
