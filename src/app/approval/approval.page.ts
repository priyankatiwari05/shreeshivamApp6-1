import { Component, OnInit } from '@angular/core';
import { TravelApprovalPage } from '../travel-approval/travel-approval.page';
import { BlankPage } from '../blank/blank.page';
import { MissPunchApprovalPage } from '../miss-punch-approval/miss-punch-approval.page'; 
import { ClaimRequestsPage } from '../claim-requests/claim-requests.page';
import { LeaveApprovalPage } from '../leave-approval/leave-approval.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {

  travel_approval=TravelApprovalPage;
  leave=LeaveApprovalPage;
  blank=BlankPage;
  miss_punch_page=MissPunchApprovalPage;
  claim_approvals=ClaimRequestsPage;

  constructor(public navCtrl: NavController) {}

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
  }
  open_root(page) {
    console.log(page);
    if(page=='claim-requests')
      this.navCtrl.navigateRoot([page,{page_type:'approver'}]);
    else
      this.navCtrl.navigateForward(page);
  }

  ngOnInit() {
  }
}
