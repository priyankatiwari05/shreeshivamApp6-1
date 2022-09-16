import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.page.html',
  styleUrls: ['./new-task-modal.page.scss'],
})
export class NewTaskModalPage implements OnInit {
  @ViewChild('slides') ionSlides: IonSlides;

  // nextSlide(){
  //   this.slides.lockSwipes(false);
  //   this.slides.slideNext();
  //   this.slides.lockSwipes(true);
  // }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ionSlides.pager = true;
    // this.ionSlides.paginationClickable = false;
  }

  ngOnInit() {
  }
}
