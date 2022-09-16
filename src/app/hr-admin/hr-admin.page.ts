import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { LeavePage } from '../leave/leave.page';
import { BlankPage } from '../blank/blank.page';
import { TravelNStayPage } from '../travel-n-stay/travel-n-stay.page';
import { AttendencePage } from '../attendence/attendence.page';
import { WarningPage } from '../warning/warning.page';
import { AppreciationPage } from '../appreciation/appreciation.page';
import { RaisedRequestPage } from '../raised-request/raised-request.page';
import { AppraisalPage } from '../appraisal/appraisal.page';

@Component({
  selector: 'app-hr-admin',
  templateUrl: './hr-admin.page.html',
  styleUrls: ['./hr-admin.page.scss'],
})
export class HrAdminPage implements OnInit {
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

  open_root(page) {
    console.log(page);
    // if(page==InfoPage)
    // this.navCtrl.push(page);
    // else
    this.navCtrl.navigateForward(page);
  }

  ngOnInit() {
  }
}