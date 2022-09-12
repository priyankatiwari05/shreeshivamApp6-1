import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SendWishesPage } from '../send-wishes/send-wishes';

/**
 * Generated class for the BirthdayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-birthday',
  templateUrl: 'birthday.html',
})
export class BirthdayPage {
  birthdays:any;
  username:any;
  today:string;
  constructor(public navCtrl: NavController,
    public storage:Storage,
    public navParams: NavParams) {
      this.today=new Date().toISOString();

    this.storage.get('birthdays').then( val =>{

      this.birthdays=val;
      console.log(this.birthdays)
      this.storage.get('username').then( val2 =>{
        this.username=val2;
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BirthdayPage');
  }

  send_wish(emp_id,fname,mname,lname)
  {
    this.navCtrl.push(SendWishesPage,{emp_id:emp_id,fname:fname,mname:mname,lname:lname,wish_type:'birthday',page_type:'send_wish'});
  }

}
