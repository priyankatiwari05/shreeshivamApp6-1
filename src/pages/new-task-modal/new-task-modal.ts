import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the NewTaskModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-task-modal',
  templateUrl: 'new-task-modal.html',
})
export class NewTaskModalPage {
  @ViewChild('slides') slides: Slides;



  // nextSlide(){
  //   this.slides.lockSwipes(false);
  //   this.slides.slideNext();
  //   this.slides.lockSwipes(true);
  // }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.slides.onlyExternal = true;
    this.slides.paginationClickable = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTaskModalPage');
  }

}
