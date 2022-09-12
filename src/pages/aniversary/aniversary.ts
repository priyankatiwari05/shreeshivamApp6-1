import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SendWishesPage } from '../send-wishes/send-wishes';

/**
 * Generated class for the AniversaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aniversary',
  templateUrl: 'aniversary.html',
})
export class AniversaryPage {
  aniversaries:any;
  username:any;
  constructor(public navCtrl: NavController,
    public storage:Storage,
    public navParams: NavParams) {
    this.storage.get('aniversaries').then( val =>{
      this.aniversaries=val;
      console.log(this.aniversaries)
      this.storage.get('username').then( val2 =>{
        this.username=val2;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AniversaryPage');
  }

  send_wish(emp_id,fname,mname,lname)
  {
    this.navCtrl.push(SendWishesPage,{emp_id:emp_id,fname:fname,mname:mname,lname:lname,wish_type:'anniversary',page_type:'send_wish'});
  }

}
