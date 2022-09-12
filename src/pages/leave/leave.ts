import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BlankPage } from '../blank/blank';
import { RaisedRequestPage } from '../raised-request/raised-request';
import { MyLeavesPage } from '../my-leaves/my-leaves';
import { LeaveFormPage } from '../leave-form/leave-form';
import { MyCalendarPage } from '../my-calendar/my-calendar';


@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
})
export class LeavePage {

  blank=BlankPage;
  // my_leave=MyLeavesPage;
  leave_form=LeaveFormPage;
  mycalendar=MyCalendarPage;
  my_request=MyLeavesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeavePage');
  }
  open_root(page) {
    console.log(page);
    this.navCtrl.push(page);
  }

}
