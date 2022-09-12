import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BirthdayPage } from '../birthday/birthday';
import { AniversaryPage } from '../aniversary/aniversary';
import { Storage } from '@ionic/storage';
import { SendWishesPage } from '../send-wishes/send-wishes';
/**
 * Generated class for the CelebrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-celebration',
  templateUrl: 'celebration.html',
})
export class CelebrationPage {
  birthday=BirthdayPage;
  aniversary=AniversaryPage;
  wishes=SendWishesPage;
  birthday_no=0;
  anniversary_no=0;
  constructor(public navCtrl: NavController,
    public storage:Storage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storage.get("birthdays").then(val2 => {
      if(val2!=null)
      {
        this.birthday_no+=val2.length;
        console.log(val2.length);
      }
      
    });

    this.storage.get("aniversaries").then(val3 => {
      if(val3!=null)
      {
        this.anniversary_no+=val3.length;
        console.log(val3.length);
      }
      
    });

  }
  open_root(page) {
    console.log(page);
    // if(page==InfoPage)
    // this.navCtrl.push(page);
    // else
    this.navCtrl.push(page);
  }

  open_wishes_page()
  {
    this.navCtrl.push(SendWishesPage,{page_type:'wishes'});
  }

}
