import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChapterDetailPageRoutingModule } from './chapter-detail-routing.module';

import { ChapterDetailPage } from './chapter-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterDetailPageRoutingModule
  ],
  declarations: [ChapterDetailPage]
})
export class ChapterDetailPageModule {}
