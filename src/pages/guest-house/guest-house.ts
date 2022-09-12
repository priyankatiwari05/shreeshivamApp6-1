import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GuestHousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guest-house',
  templateUrl: 'guest-house.html',
})
export class GuestHousePage {
  booking_for:any;
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public navParams: NavParams) {
    this.storage.get('username').then( (val) =>{
      this.booking_for=val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestHousePage');
  }

}
