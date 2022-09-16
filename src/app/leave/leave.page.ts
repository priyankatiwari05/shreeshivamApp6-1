import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { BlankPage } from '../blank/blank.page';
import { RaisedRequestPage } from '../raised-request/raised-request.page';
import { MyLeavesPage } from '../my-leaves/my-leaves.page';
import { LeaveFormPage } from '../leave-form/leave-form.page';
import { MyCalendarPage } from '../my-calendar/my-calendar.page';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.page.html',
  styleUrls: ['./leave.page.scss'],
})
export class LeavePage implements OnInit {
  blank=BlankPage;
  // my_leave=MyLeavesPage;
  leave_form=LeaveFormPage;
  mycalendar=MyCalendarPage;
  my_leaves=MyLeavesPage;
  constructor(public navCtrl: NavController) {
  }

  open_root(page) {
    console.log(page);
    this.navCtrl.navigateForward(page);
  }

  ngOnInit() {
  }
}