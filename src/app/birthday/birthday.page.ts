import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'
import { SendWishesPage } from '../send-wishes/send-wishes.page'; 

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.page.html',
  styleUrls: ['./birthday.page.scss'],
})
export class BirthdayPage implements OnInit {
  birthdays:any;
  username:any;
  today:string;
  constructor(public navCtrl: NavController,
    public storage:Storage) {
      this.today=new Date().toISOString();

    this.storage.get('birthdays').then( val =>{

      this.birthdays=val;
      console.log(this.birthdays)
      this.storage.get('username').then( val2 =>{
        this.username=val2;
      });
    })
  }

  send_wish(emp_id,fname,mname,lname)
  {
    this.navCtrl.navigateRoot([SendWishesPage,{emp_id:emp_id,fname:fname,mname:mname,lname:lname,wish_type:'birthday',page_type:'send_wish'}]);
  }
  ngOnInit() {
  }
}
