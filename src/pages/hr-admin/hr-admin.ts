import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LeavePage } from '../leave/leave';
import { BlankPage } from '../blank/blank';
import { TravelNStayPage } from '../travel-n-stay/travel-n-stay';
import { AttendencePage } from '../attendence/attendence';
import { WarningPage } from '../warning/warning';
import { AppreciationPage } from '../appreciation/appreciation';
import { RaisedRequestPage } from '../raised-request/raised-request';
import { AppraisalPage } from '../appraisal/appraisal';

@Component({
  selector: 'page-hr-admin',
  templateUrl: 'hr-admin.html',
})
export class HrAdminPage {
  leave=LeavePage;
  blank=BlankPage;
  travel_n_stay=TravelNStayPage;
  attendence=AttendencePage;
  warning=WarningPage;
  appreciation=AppreciationPage;
  raised_request=RaisedRequestPage;
  appraisal=AppraisalPage;
  constructor(public navCtrl: NavController, public navParams: NavParams){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HrAdminPage');
  }
  open_root(page) {
    console.log(page);
    // if(page==InfoPage)
    // this.navCtrl.push(page);
    // else
    this.navCtrl.push(page);
  }
}
