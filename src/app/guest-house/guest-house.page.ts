import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-guest-house',
  templateUrl: './guest-house.page.html',
  styleUrls: ['./guest-house.page.scss'],
})
export class GuestHousePage implements OnInit {
  booking_for:any;
  constructor(public navCtrl: NavController,
    public storage: Storage) {
    this.storage.get('username').then( (val) =>{
      this.booking_for=val;
    });
  }

  ngOnInit() {
  }
}
