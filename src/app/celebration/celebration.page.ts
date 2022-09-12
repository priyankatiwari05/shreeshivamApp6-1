import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BirthdayPage } from '../birthday/birthday.page'; 
import { AniversaryPage } from '../aniversary/aniversary.page';
import { Storage } from '@ionic/storage-angular';
import { SendWishesPage } from '../send-wishes/send-wishes.page';

@Component({
  selector: 'app-celebration',
  templateUrl: './celebration.page.html',
  styleUrls: ['./celebration.page.scss'],
})
export class CelebrationPage implements OnInit {
  birthday=BirthdayPage;
  aniversary=AniversaryPage;
  wishes=SendWishesPage;
  birthday_no=0;
  anniversary_no=0;
  constructor(public navCtrl: NavController, public storage:Storage) {

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
    this.navCtrl.navigateForward(page);
  }

  open_wishes_page(page,page_type)
  {
    console.log('open wishes');
    this.navCtrl.navigateForward([page,{page_type:page_type}]);
  }

  ngOnInit() {
  }
}
