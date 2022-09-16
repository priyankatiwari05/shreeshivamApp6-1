import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BlankPage } from '../blank/blank.page'; 
import { TravelEntitlementPageModule } from '../travel-entitlement/travel-entitlement.module'; 
import { ClaimRequestsPage } from '../claim-requests/claim-requests.page'; 
import { BusinessPage } from '../business/business.page';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  blank=BlankPage;
  myclaims=ClaimRequestsPage;
  travel_entitlement= TravelEntitlementPageModule;
  business=BusinessPage;
  constructor(public navCtrl: NavController) {}

  open_root(page) {
    console.log('inside open_root function');
    console.log(page);
      this.navCtrl.navigateForward([page,{page_type:'emp'}]);
  }

  ngOnInit() {
  }
}