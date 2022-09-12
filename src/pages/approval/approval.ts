import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TravelApprovalPage } from '../travel-approval/travel-approval';
import { BlankPage } from '../blank/blank';
import { MissPunchApprovalPage } from '../miss-punch-approval/miss-punch-approval';
import { ClaimRequestsPage } from '../claim-requests/claim-requests';
import { LeaveApprovalPage } from '../leave-approval/leave-approval';

@Component({
  selector: 'page-approval',
  templateUrl: 'approval.html',
})
export class ApprovalPage {
  travel_approval=TravelApprovalPage;
  leave=LeaveApprovalPage;
  blank=BlankPage;
  miss_punch_page=MissPunchApprovalPage;
  claim_approvals=ClaimRequestsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovalPage');
  }
  doRefresh(refresher){
    console.log('Begin async operation', refresher);
  }
  open_root(page) {
    console.log(page);
    if(page==ClaimRequestsPage)
      this.navCtrl.push(page,{page_type:'approver'});
    else
      this.navCtrl.push(page);
  }
}
